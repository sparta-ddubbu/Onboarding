'use client';

import React from 'react';
import Template from '@/components/SignIn';
import { useSignIn } from './useSignIn';

const SignInPage = () => {
  const props = useSignIn();
  return <Template {...props} />;
};

export default SignInPage;
