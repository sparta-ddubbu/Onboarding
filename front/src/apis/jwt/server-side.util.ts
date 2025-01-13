'use server';

import { cookies } from 'next/headers';

type TokenManagerReturn = {
  isLoggedIn: boolean;
};

export const tokenManager = async (): Promise<TokenManagerReturn> => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;
  const isLoggedIn = Boolean(accessToken);

  return { isLoggedIn };
};
