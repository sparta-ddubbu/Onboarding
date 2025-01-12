'use client';

import React from 'react';
import MypageComponent from './components/template';
import withCheckLogin from '@/container/withCheckLogIn';

const Mypage = () => {
  return <MypageComponent />;
};

export default withCheckLogin(Mypage);
