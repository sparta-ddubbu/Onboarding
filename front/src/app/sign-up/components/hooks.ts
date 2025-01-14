import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormParams, SignUpProps } from '@/app/sign-up/components/template';
import { SignUpSchema } from './constant';
import serverAPIs from '@/apis/server/server';

export const useSignUp = (): SignUpProps => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpFormParams>({ resolver: zodResolver(SignUpSchema) });

  const submitAction = async (data: SignUpFormParams) => {
    try {
      await serverAPIs.auth.signUpAPI(data).then(() => {
        console.log('SignUp successful');
      });
    } catch (e) {
      console.error('SignUp failed:', e);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
