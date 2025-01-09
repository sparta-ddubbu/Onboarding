import Link from 'next/link';
import Image from 'next/image';
import * as S from './style';
import { MAIN_MENU_LIST, SUB_MENU_LIST } from './constant';

const Template = () => (
  <S.Background>
    <S.Content>
      <S.Left>
        <Link href='/'>
          <Image src={'/images/logo/newLogo.svg'} alt='logo' width={134} height={40} />
        </Link>
        <S.LeftMenuWrapper>
          {MAIN_MENU_LIST.map((item) => {
            switch (item.type) {
              case 'single':
                return (
                  <S.LeftMenuItem key={item.title}>
                    <Link href={item.href}>{item.title}</Link>
                  </S.LeftMenuItem>
                );
              case 'nested':
                return <S.LeftMenuItem key={item.title}>{item.title} (nested)</S.LeftMenuItem>;
              default:
                throw new Error('새로운 GNB 메뉴 형식 정의가 필요해요');
            }
          })}
        </S.LeftMenuWrapper>
      </S.Left>
      <S.Right>
        {SUB_MENU_LIST.map((item) => {
          switch (item.type) {
            case 'single':
              return (
                <S.RightMenuItem key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                </S.RightMenuItem>
              );
            case 'nested':
              return <S.RightMenuItem key={item.title}>{item.title} (nested)</S.RightMenuItem>;
            default:
              throw new Error('새로운 GNB 메뉴 형식 정의가 필요해요');
          }
        })}
      </S.Right>
    </S.Content>
  </S.Background>
);

export default Template;
