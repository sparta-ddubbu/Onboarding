'use client';

import React from 'react';
import SignInComponent from '@/app/sign-in/components';
import { useSignIn } from './useSignIn';

const SignInPage = () => {
  const props = useSignIn();
  return <SignInComponent {...props} />;
};

export default SignInPage;
