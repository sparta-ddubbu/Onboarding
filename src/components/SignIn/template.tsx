import * as S from './style';
import Input, { InputProps } from '../Input';
import { Button } from '@teamsparta/stack-button';

export type SignInProps = {
  email: string;
  password: string;
  updateEmail: InputProps['onHandleChange'];
  updatePassword: InputProps['onHandleChange'];
  submit: () => void;
};

const Template = (props: SignInProps) => {
  return (
    <S.Background>
      <S.Content>
        <S.Title>로그인</S.Title>
        <S.Form>
          <Input placeholder='이메일 입력' value={props.email} onHandleChange={props.updateEmail} />
          <Input placeholder='비밀번호 입력' value={props.password} onHandleChange={props.updatePassword} />
          <Button radius='rounded' colorScheme='primary' fullWidth onClick={props.submit}>
            로그인
          </Button>
        </S.Form>
      </S.Content>
    </S.Background>
  );
};

export default Template;
