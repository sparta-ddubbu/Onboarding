import { SignInProps } from '@/components/SignIn/template';

export const useSignIn = (): SignInProps => {
  return {
    email: '',
    password: '',
    submit: () => {},
    updateEmail: () => {},
    updatePassword: () => {},
  };
};
