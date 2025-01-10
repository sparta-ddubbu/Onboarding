import { FormEventHandler } from 'react';
import * as S from './style';
import Input from '../../../components/Input/template';
import { Button } from '@teamsparta/stack-button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignInSchemaType } from './constant';

export type SignInFormParams = SignInSchemaType & {};

export type SignInProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<SignInFormParams>;
  errors: FieldErrors<SignInFormParams>;
};

const SignInComponent = (props: SignInProps) => {
  return (
    <S.Background>
      <S.Content>
        <S.Title>로그인</S.Title>
        <S.Form onSubmit={props.handleSubmit}>
          <Input
            {...props.register('nickname')}
            placeholder='닉네임 입력'
            errorMessage={props.errors.nickname?.message}
          />
          <Input
            {...props.register('password')}
            placeholder='비밀번호 입력'
            errorMessage={props.errors.password?.message}
          />
          <Button radius='rounded' colorScheme='primary' fullWidth>
            로그인
          </Button>
        </S.Form>
      </S.Content>
    </S.Background>
  );
};

export default SignInComponent;
