import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormParams, SignInProps } from '@/app/sign-in/components';
import { SignInSchema } from './components/constant';

export const useSignIn = (): SignInProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInFormParams>({ resolver: zodResolver(SignInSchema) });

  const submitAction = (data: any) => {
    alert('submit!' + JSON.stringify(data));
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
