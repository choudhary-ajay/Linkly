'use client';

import { useSearchParams } from 'next/navigation';

export default function GenerateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
      <h1>Generate Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}