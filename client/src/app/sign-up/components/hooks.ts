import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormParams, SignUpProps } from '@/app/sign-up/components/template';
import { SignUpSchema } from './constant';
import { useMutation } from '@tanstack/react-query';
import APIs from '@/apis';

export const useSignUp = (): SignUpProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpFormParams>({ resolver: zodResolver(SignUpSchema) });

  const { mutate } = useMutation({
    mutationFn: APIs.auth.signUpAPI,
    onSuccess: (data) => {
      console.log('SignUp successful:', data);
    },
    onError: (err) => {
      console.error('SignUp failed:', err);
    },
  });

  const submitAction = (data: SignUpFormParams) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
