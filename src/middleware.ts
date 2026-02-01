import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting (Note: In serverless/Vercel, use Upstash/Redis)
const rateLimitMap = new Map();

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const RATELIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  default: { windowMs: 60 * 1000, max: 60 }, // 60 requests per minute
  auth: { windowMs: 15 * 60 * 1000, max: 10 }, // 10 requests per 15 mins (Login/Register)
};

function getRateLimit(ip: string, type: 'default' | 'auth') {
  // Safety valve for memory
  if (rateLimitMap.size > 10000) {
    rateLimitMap.clear();
  }

  const config = RATELIMIT_CONFIGS[type];
  const now = Date.now();

  const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - record.startTime > config.windowMs) {
    // Reset window
    record.count = 1;
    record.startTime = now;
  } else {
    record.count++;
  }

  rateLimitMap.set(ip, record);

  return {
    limit: config.max,
    remaining: Math.max(0, config.max - record.count),
    success: record.count <= config.max,
  };
}

export async function middleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const path = req.nextUrl.pathname;

  // 1. Security Headers
  const response = NextResponse.next();
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // 2. Rate Limiting
  // Only apply to /api routes
  if (path.startsWith('/api')) {
    const isAuth =
      path.includes('/auth/login') || path.includes('/auth/register');
    const result = getRateLimit(ip, isAuth ? 'auth' : 'default');

    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: {
            message: 'Too many requests, please try again later.',
            code: 'RATE_LIMIT_EXCEEDED',
          },
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': '0',
          },
        },
      );
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
