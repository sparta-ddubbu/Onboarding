'use server';

import React from 'react';
import ClientComponent from './template.client';
import { tokenManager } from '@/apis/jwt/server-side.util';

const ServerComponent = async () => {
  const { isLoggedIn } = await tokenManager();

  return <ClientComponent isLoggedIn={isLoggedIn} />;
};

export default ServerComponent;
