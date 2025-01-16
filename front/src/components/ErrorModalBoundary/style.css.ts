import { zIndex } from '@/constants/zIndex';
import { style } from '@vanilla-extract/css';

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
  zIndex: zIndex.modal,
});

export const modal = style({
  background: 'white',
  padding: '30px',
  borderRadius: '8px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
});

export const modalTitle = style({
  marginBottom: '15px',
  fontSize: '20px',
  color: '#333',
});

export const modalMessage = style({
  marginBottom: '30px',
  fontSize: '17px',
  color: 'rgb(85, 85, 85)',
});

export const bottomWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1rem',
});

export const errorCode = style({
  color: 'rgb(215, 207, 209)',
});

export const closeButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: 'rgb(232,52,78)',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: 'rgb(185, 11, 37)',
  },
});
