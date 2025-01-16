// ErrorModalBoundary.css.ts
import { zIndex } from '@/constants/zIndex';
import { style } from '@vanilla-extract/css';

// 전체 화면을 덮는 오버레이 스타일
export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndex.modal, // 다른 콘텐츠보다 위에
});

// 모달 스타일
export const modal = style({
  background: 'white',
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative', // 버튼을 오른쪽 상단에 위치시키기 위해 상대적 위치 지정
});

// 제목 스타일
export const modalTitle = style({
  marginBottom: '1rem',
  fontSize: '1rem',
  color: '#333',
});

// 메시지 스타일
export const modalMessage = style({
  marginBottom: '1.5rem',
  fontSize: '1rem',
  color: '#666',
});

// 버튼 스타일
export const closeButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: 'rgb(232,52,78)',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  ':hover': {
    backgroundColor: 'rgb(185, 11, 37)',
  },
});
