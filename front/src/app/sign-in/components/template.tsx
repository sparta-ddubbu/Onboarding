import { FormEventHandler } from 'react';
import * as S from './style';
import Input from '../../../components/Input/template';
import { Button } from '@teamsparta/stack-button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignInSchemaType } from './constant';
import { StackProvider } from '@teamsparta/stack-core';
import { useSignIn } from './hooks';

export type SignInFormParams = SignInSchemaType & {};

export type SignInProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<SignInFormParams>;
  errors: FieldErrors<SignInFormParams>;
};

const SignInComponent = () => {
  const props = useSignIn(); // useContext 초기화를 위해 안쪽으로 들어옴
  return (
    <StackProvider theme='nbcLight'>
      <S.Background>
        <S.Content>
          <S.Title>로그인</S.Title>
          <S.Form onSubmit={props.handleSubmit}>
            <Input {...props.register('nickname')} placeholder='닉네임' errorMessage={props.errors.nickname?.message} />
            <Input
              {...props.register('password')}
              placeholder='비밀번호'
              errorMessage={props.errors.password?.message}
            />
            <Button radius='rounded' colorScheme='primary' fullWidth>
              로그인
            </Button>
          </S.Form>
        </S.Content>
      </S.Background>
    </StackProvider>
  );
};

export default SignInComponent;
