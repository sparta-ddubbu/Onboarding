'use client';

import clientAPIs from '@/apis/client';
import * as S from './style.css';
import { useState } from 'react';
import { useQuery } from 'react-query';

const ClientComponent = () => {
  const [nickname, setNickname] = useState('');

  useQuery(['userInfo'], () => clientAPIs.user.getInfoAPI().then(({ data }) => data), {
    onSuccess: (data) => {
      setNickname(data.nickname);
    },
  });

  return (
    <div className={S.background}>
      <div className={S.content}>
        <div className={S.section1}>
          <h2>닉네임</h2>
          <h6>{nickname}</h6>
        </div>
        <div className={S.section2}>컨텐츠</div>
      </div>
    </div>
  );
};

export default ClientComponent;
