import { zIndex } from '@/constants/zIndex';
import styled from '@emotion/styled';
import { neutralDay } from '@teamsparta/design-system';
import Link from 'next/link';

export const Background = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid rgb(228, 235, 240);
  z-index: ${zIndex.gnb};
`;

export const Content = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 0px 24px;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.ul`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 40px;
`;

export const LeftMenuWrapper = styled.ul`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
`;

const CommonMenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 2px;

  width: fit-content;
  padding: 6px 10px;
  padding-top: 8px; /* vertical align 조정 */
  /* line-height: 26px; */

  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #eef3f6;
  }
`;

export const LeftMenuItem = styled(CommonMenuItem)``;

export const Right = styled.ul`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
`;

export const RightMenuItem = styled(LeftMenuItem)`
  color: ${neutralDay.gray70};
`;
