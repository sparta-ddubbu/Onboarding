'use server';

import { tokenManager } from '@/apis/jwt/server-side.util';
import { PAGE_URLS } from '@/constants/page-urls';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const CheckLoginServerComponent = async ({ children }: Props) => {
  const { isLoggedIn } = await tokenManager();

  if (!isLoggedIn) {
    redirect(PAGE_URLS.home);
  }

  return <>{children}</>;
};

export default CheckLoginServerComponent;
