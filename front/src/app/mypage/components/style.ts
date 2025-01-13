import { styleVariables } from '@/constants/style';
import styled from '@emotion/styled';
import { primitiveColor } from '@teamsparta/stack-tokens';

export const Background = styled.section`
  width: 100%;
  height: 100%;
  padding: 20px 0;

  background-color: ${primitiveColor.neutral[20]};
  display: flex;
  flex-direction: column;
`;
export const Content = styled.section`
  width: 100%;
  height: 100%;

  max-width: ${styleVariables.PC_MAX_WIDTH}px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-bottom: 60px;
`;

const CommonSection = styled.section`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
`;

export const Section1 = styled(CommonSection)`
  background-color: ${primitiveColor.blue[10]};
`;

export const Section2 = styled(CommonSection)`
  background-color: ${primitiveColor.blue[20]};
`;

export const Section3 = styled(CommonSection)`
  background-color: ${primitiveColor.blue[30]};
`;

export const Section4 = styled(CommonSection)`
  background-color: ${primitiveColor.blue[40]};
`;
