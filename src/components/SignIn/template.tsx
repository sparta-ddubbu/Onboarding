import { FormEventHandler } from 'react';
import * as S from './style';
import Input from '../Input';
import { Button } from '@teamsparta/stack-button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export type SignInFormParams = {
  nickname: string;
  password: string;
};

export type SignInProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<SignInFormParams>;
  errors: FieldErrors<SignInFormParams>;
};

const Template = (props: SignInProps) => {
  return (
    <S.Background>
      <S.Content>
        <S.Title>로그인</S.Title>
        <S.Form onSubmit={props.handleSubmit}>
          <Input
            {...props.register('nickname', {
              required: { value: true, message: '닉네임을 입력해주세요' },
            })}
            placeholder='닉네임 입력'
            errorMessage={props.errors.nickname?.message}
          />
          <Input
            {...props.register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
              minLength: {
                value: 8,
                message: '비밀번호 길이를 8자리 이상 입력해주세요',
              },
            })}
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

export default Template;
