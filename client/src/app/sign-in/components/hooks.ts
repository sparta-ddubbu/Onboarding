import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormParams, SignInProps } from '@/app/sign-in/components/template';
import { SignInSchema } from './constant';

export const useSignIn = (): SignInProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInFormParams>({ resolver: zodResolver(SignInSchema) });

  const submitAction = (data: SignInFormParams) => {
    alert('submit!' + JSON.stringify(data));
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
