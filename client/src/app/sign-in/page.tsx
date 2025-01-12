'use client';

import React from 'react';
import SignInComponent from '@/app/sign-in/components/template';
import { useSignIn } from './components/hooks';

const SignInPage = () => {
  const props = useSignIn();
  return <SignInComponent {...props} />;
};

export default SignInPage;
