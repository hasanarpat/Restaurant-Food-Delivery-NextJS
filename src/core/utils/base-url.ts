import { headers } from 'next/headers';

export async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
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
