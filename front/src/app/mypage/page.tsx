'use server';
import React from 'react';
import ServerComponent from './components/template.server';
import CheckLoginServerComponent from '@/container/CheckLoginServerComponent';

const Mypage = () => {
  return (
    <CheckLoginServerComponent>
      <ServerComponent />
    </CheckLoginServerComponent>
  );
};

export default Mypage;
