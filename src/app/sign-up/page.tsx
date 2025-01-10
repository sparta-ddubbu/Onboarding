'use client';

import React from 'react';
import SignUpComponent from '@/app/sign-up/components/template';
import { useSignUp } from './components/hooks';

const SignUpPage = () => {
  const props = useSignUp();
  return <SignUpComponent {...props} />;
};

export default SignUpPage;
