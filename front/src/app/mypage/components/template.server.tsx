'use server';

import APIs from '@/apis';
import * as S from './style.css';

const ServerComponent = async () => {
  let nickname;
  try {
    await APIs.user.getInfoAPI().then(({ data }) => {
      nickname = data.nickname;
    });
  } catch (error) {
    console.error('Error fetching user info', error);
  }

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

export default ServerComponent;
