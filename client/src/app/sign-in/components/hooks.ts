import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormParams, SignInProps } from '@/app/sign-in/components/template';
import { SignInSchema } from './constant';
import { useMutation } from '@tanstack/react-query';
import APIs from '@/apis';
import { apiClientMethods } from '@/apis/apiClient';

export const useSignIn = (): SignInProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInFormParams>({ resolver: zodResolver(SignInSchema) });

  const { mutate } = useMutation({
    mutationFn: APIs.auth.signInAPI,
    onSuccess: (data) => {
      const { accessToken } = data;

      apiClientMethods.setAccessToken(accessToken);
      // TODO: update loggedIn context
      console.log('Login successful:', data);
    },
    onError: (err) => {
      console.error('Login failed:', err);
    },
  });

  const submitAction = (data: SignInFormParams) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
