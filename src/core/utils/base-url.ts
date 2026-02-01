import { headers } from 'next/headers';

export async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, '');
  }

  try {
    const headersList = await headers();
    const host = headersList.get('host');
    // Default to http for dev/local, https for prod
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${host}`;
  } catch (error) {
    return 'http://localhost:3000';
  }
}
