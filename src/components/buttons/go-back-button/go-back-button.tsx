'use client';

import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/src/components/buttons/button/button';

type Props = {
  onClick?: () => void;
};

export const GoBackButton = ({ onClick }: Props) => {
  const router = useRouter();
  return (
    <Button
      type="button"
      onClick={onClick ? onClick : () => router.back()}
      variant="primary"
    >
      <ArrowLeft />
      Go back
    </Button>
  );
};
