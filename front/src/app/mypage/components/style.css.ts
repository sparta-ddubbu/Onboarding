import { style } from '@vanilla-extract/css';
import { styleVariables } from '@/constants/style';
import { primitiveColor } from '@teamsparta/stack-tokens';

export const background = style({
  width: '100%',
  height: `calc(100vh - ${styleVariables.PC_GNB_HEIGHT}px)`,
  padding: '20px 0',
  backgroundColor: primitiveColor.neutral[20],
  display: 'flex',
  flexDirection: 'column',
});

export const content = style({
  width: '100%',
  height: '100%',
  maxWidth: `${styleVariables.PC_MAX_WIDTH}px`,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingBottom: '60px',
});

const commonSection = style({
  width: '100%',
  height: '200px',
  borderRadius: '10px',
  padding: '10px',
});

export const section1 = style([
  commonSection,
  {
    backgroundColor: primitiveColor.blue[20],
  },
]);

export const section2 = style([
  commonSection,
  {
    backgroundColor: primitiveColor.blue[30],
  },
]);
