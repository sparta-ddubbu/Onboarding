'use server';

import { severTokenManager } from '@/apis/jwt/util.server';
import { PAGE_URLS } from '@/constants/page-urls';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const CheckLoginServerComponent = async ({ children }: Props) => {
  const { isLoggedIn } = await severTokenManager();

  if (!isLoggedIn) {
    redirect(PAGE_URLS.home);
  }

  return <>{children}</>;
};

export default CheckLoginServerComponent;
