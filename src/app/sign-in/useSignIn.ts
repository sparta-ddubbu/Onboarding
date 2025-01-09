import { useForm } from 'react-hook-form';
import { SignInFormParams, SignInProps } from '@/components/SignIn/template';

export const useSignIn = (): SignInProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInFormParams>();

  const submitAction = (data: any) => {
    alert('submit!' + JSON.stringify(data));
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
