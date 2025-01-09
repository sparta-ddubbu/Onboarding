import styled from '@emotion/styled';
import { bodyM } from '@teamsparta/stack-font';
import { primitiveColor } from '@teamsparta/stack-tokens';

export const Input = styled.input`
  ${bodyM};

  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background: ${primitiveColor.neutral[10]};
  border-radius: 8px;
  outline: none;
  border: none;
  color: ${primitiveColor.neutral[100]};

  width: 100%;
  height: 61px;
  padding: 24px;

  &:focus {
    background: ${primitiveColor.neutral[20]};
  }
`;
