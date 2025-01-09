import { ChangeEvent } from 'react';
import * as S from './style';

export type InputProps = {
  value: string;
  onHandleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input = ({ value, placeholder, onHandleChange }: InputProps) => {
  return <S.Input placeholder={placeholder} value={value} onChange={onHandleChange} />;
};

export default Input;
