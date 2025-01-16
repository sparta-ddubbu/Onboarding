import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormParams, SignUpProps } from '@/app/sign-up/components/template';
import { SignUpSchema } from './constant';
import clientAPIs from '@/apis/client';
import { useRouter } from 'next/navigation';
import { PAGE_URLS } from '@/constants/page-urls';

export const useSignUp = (): SignUpProps => {
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpFormParams>({ resolver: zodResolver(SignUpSchema) });

  const submitAction = async (data: SignUpFormParams) => {
    try {
      await clientAPIs.auth.signUpAPI(data).then(() => {
        router.push(PAGE_URLS.home);
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
