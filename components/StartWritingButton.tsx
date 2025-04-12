'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

export default function StartWritingButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session?.user) {
      router.push('/create');
    } else {
      router.push('/api/auth/signin');
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="light"
      className="d-inline-flex align-items-center gap-2 px-4 py-2 fs-5 fw-medium shadow-sm"
      style={{ borderRadius: '40px' }}
    >
      <img src="/logo.png" height={24} alt="Scribo logo" />
      Start Writing
    </Button>
  );
}
