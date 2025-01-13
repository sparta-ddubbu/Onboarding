import { styleVariables } from '@/constants/style';
import { zIndex } from '@/constants/zIndex';
import { primitiveColor } from '@teamsparta/stack-tokens';
import { style } from '@vanilla-extract/css';

// 공통 스타일
const commonMenuItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  width: 'fit-content',
  padding: '6px 10px',
  paddingTop: '8px', // vertical align 조정
  cursor: 'pointer',
  borderRadius: '6px',
  selectors: {
    '&:hover': {
      backgroundColor: '#eef3f6',
    },
  },
});

// GNB 배경 스타일
export const background = style({
  position: 'sticky',
  top: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderBottom: '1px solid rgb(228, 235, 240)',
  zIndex: zIndex.gnb,
});

// 콘텐츠 스타일
export const content = style({
  width: '100%',
  maxWidth: '1200px',
  margin: `0px ${styleVariables.MOBILE_SIDE_PADDING}px`,
  height: styleVariables.PC_GNB_HEIGHT,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

// 왼쪽 메뉴 스타일
export const left = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  gap: '40px',
});

// 왼쪽 메뉴 래퍼 스타일
export const leftMenuWrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  gap: '8px',
});

// 오른쪽 메뉴 스타일
export const right = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  gap: '8px',
});

// 왼쪽 메뉴 아이템 스타일
export const leftMenuItem = style([commonMenuItem]);

// 오른쪽 메뉴 아이템 스타일
export const rightMenuItem = style([
  commonMenuItem,
  {
    color: primitiveColor.neutral[70],
  },
]);
