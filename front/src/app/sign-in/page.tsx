'use client';

import React from 'react';
import SignInComponent from '@/app/sign-in/components/template';
import ErrorModalBoundary from '@/components/ErrorModalBoundary/template.client';
import { ErrorModalProvider } from '@/components/ErrorModalBoundary/ErrorModalProvider';

const SignInPage = () => {
  return (
    <ErrorModalProvider>
      <ErrorModalBoundary>
        <SignInComponent />
      </ErrorModalBoundary>
    </ErrorModalProvider>
  );
};

export default SignInPage;
