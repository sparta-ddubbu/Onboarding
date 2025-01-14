'use server';

import { cookies } from 'next/headers';

type TokenManagerReturn = {
  isLoggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
};

const AT_KEY = 'accessToken';
const RT_KEY = 'refreshToken';

export const severTokenManager = async (): Promise<TokenManagerReturn> => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get(AT_KEY)?.value;
  const refreshToken = (await cookieStore).get(RT_KEY)?.value;
  const isLoggedIn = Boolean(accessToken);

  return { isLoggedIn, accessToken, refreshToken };
};
