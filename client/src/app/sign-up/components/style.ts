import styled from '@emotion/styled';
import { title1 } from '@teamsparta/stack-font';

export const Background = styled.section`
  width: 100%;
  height: 100%;
`;

export const Content = styled.section`
  margin: 0 auto;
  max-width: 500px;
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.div`
  margin-top: 20px;
  ${title1}
`;
