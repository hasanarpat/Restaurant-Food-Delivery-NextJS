import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login?from=/profile');
  }

  return <ProfileClient />;
};

export default ProfilePage;
