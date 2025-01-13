import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormParams, SignInProps } from '@/app/sign-in/components/template';
import { SignInSchema } from './constant';
import APIs from '@/apis';
import { PAGE_URLS } from '@/constants/page-urls';
import { useRouter } from 'next/navigation';

export const useSignIn = (): SignInProps => {
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInFormParams>({ resolver: zodResolver(SignInSchema) });

  const submitAction = async (data: SignInFormParams) => {
    try {
      await APIs.auth.signInAPI(data).then(({ accessToken }) => {
        router.push(PAGE_URLS.home);
        router.refresh();
      });
    } catch (e) {
      console.error('SignIn failed:', e);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(submitAction),
    errors,
  };
};
