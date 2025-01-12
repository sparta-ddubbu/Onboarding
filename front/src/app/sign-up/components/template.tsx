import { FormEventHandler } from 'react';
import * as S from './style';
import Input from '../../../components/Input/template';
import { Button } from '@teamsparta/stack-button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignUpSchemaType } from './constant';

export type SignUpFormParams = SignUpSchemaType & {};

export type SignUpProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<SignUpFormParams>;
  errors: FieldErrors<SignUpFormParams>;
};

const SignUpComponent = (props: SignUpProps) => {
  return (
    <S.Background>
      <S.Content>
        <S.Title>회원가입</S.Title>
        <S.Form onSubmit={props.handleSubmit}>
          <Input {...props.register('nickname')} placeholder='닉네임' errorMessage={props.errors.nickname?.message} />
          <Input {...props.register('password')} placeholder='비밀번호' errorMessage={props.errors.password?.message} />
          <Input
            {...props.register('passwordConfirm')}
            placeholder='비밀번호 확인'
            errorMessage={props.errors.passwordConfirm?.message}
          />
          <Button radius='rounded' colorScheme='primary' fullWidth>
            로그인
          </Button>
        </S.Form>
      </S.Content>
    </S.Background>
  );
};

export default SignUpComponent;
