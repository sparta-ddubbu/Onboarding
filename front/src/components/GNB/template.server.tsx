'use server';

import React from 'react';
import ClientComponent from './template.client';
import { severTokenManager } from '@/apis/jwt/server-side.util';

const ServerComponent = async () => {
  const { isLoggedIn } = await severTokenManager();

  return <ClientComponent isLoggedIn={isLoggedIn} />;
};

export default ServerComponent;
