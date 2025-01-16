'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormParams, SignInProps } from '@/app/sign-in/components/template';
import { SignInSchema } from './constant';
import clientAPIs from '@/apis/client';
import { PAGE_URLS } from '@/constants/page-urls';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ErrorModalContext } from '@/components/ErrorModalBoundary/ErrorModalProvider';

export const useSignIn = (): SignInProps => {
  const router = useRouter();
  const context = useContext(ErrorModalContext);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInFormParams>({ resolver: zodResolver(SignInSchema) });

  const submitAction = async (data: SignInFormParams) => {
    await clientAPIs.auth
      .signInAPI(data)
      .then(() => {
        router.push(PAGE_URLS.home);
        router.refresh();
      })
      .catch((err) => {
        context.throwError(err);
      });
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
