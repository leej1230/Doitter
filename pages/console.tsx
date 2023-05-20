import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '@/components/loadingScreen';

export default function Console() {
  const { user, error, isLoading,  } = useUser();

  if (isLoading) return <div><LoadingScreen /></div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user!.picture} alt={user!.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}