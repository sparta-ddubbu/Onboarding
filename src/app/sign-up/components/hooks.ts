import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormParams, SignUpProps } from '@/app/sign-up/components/template';
import { SignUpSchema } from './constant';

export const useSignUp = (): SignUpProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpFormParams>({ resolver: zodResolver(SignUpSchema) });

  const submitAction = (data: any) => {
    alert('submit!' + JSON.stringify(data));
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
