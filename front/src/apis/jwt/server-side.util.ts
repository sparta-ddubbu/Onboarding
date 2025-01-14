'use server';

import { cookies } from 'next/headers';

type TokenManagerReturn = {
  isLoggedIn: boolean;
  clearTokens: () => Promise<void>;
};

const AT_KEY = 'accessToken';
const RT_KEY = 'refreshToken';

export const tokenManager = async (): Promise<TokenManagerReturn> => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get(AT_KEY)?.value;
  const isLoggedIn = Boolean(accessToken);

  const clearTokens = async () => {
    (await cookieStore).delete(AT_KEY);
    (await cookieStore).delete(RT_KEY);
  };

  return { isLoggedIn, clearTokens };
};
