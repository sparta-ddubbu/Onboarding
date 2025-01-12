import * as S from './style';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

const Input = (props: InputProps) => {
  return (
    <S.Wrapper>
      <S.Input {...props} />
      {props.errorMessage && <S.ErrorMsg>{props.errorMessage}</S.ErrorMsg>}
    </S.Wrapper>
  );
};

export default Input;
