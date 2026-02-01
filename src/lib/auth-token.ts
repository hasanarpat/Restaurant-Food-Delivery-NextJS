import { SignJWT, jwtVerify } from 'jose';
import { env } from '@/core/config/env';

export interface JWTPayload {
  userId: string;
  role: string;
  permissions?: string[];
  sessionVersion?: number;
}

const SECRET = new TextEncoder().encode(env.JWT_SECRET);
const ALG = 'HS256';

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('2h') // Short-lived as requested
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
