import React from 'react';
import MypageComponent from './components/template';
import CheckLoginServerComponent from '@/container/CheckLoginServerComponent';

const Mypage = () => {
  return (
    <CheckLoginServerComponent>
      <MypageComponent />
    </CheckLoginServerComponent>
  );
};

export default Mypage;
