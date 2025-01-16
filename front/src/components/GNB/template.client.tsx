'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LOGIN_MENU_ITEM, MAIN_MENU_LIST, MYPAGE_MENU_ITEM, SIGNUP_MENU_ITEM, SUB_MENU_LIST } from './constant';
import * as S from './style.css';
import { PAGE_URLS } from '@/constants/page-urls';
import { useRouter } from 'next/navigation';
import clientAPIs from '@/apis/client';

type Props = {
  isLoggedIn: boolean;
};

const ClientComponent: React.FC<Props> = ({ isLoggedIn }) => {
  const router = useRouter();
  const getSubMenuListWithLoginMenu = () => {
    const menuList = [...SUB_MENU_LIST];

    if (isLoggedIn) {
      menuList.unshift(MYPAGE_MENU_ITEM);
    } else {
      menuList.unshift(LOGIN_MENU_ITEM);
      menuList.unshift(SIGNUP_MENU_ITEM);
    }

    return menuList;
  };

  const handleClickLogout = async () => {
    await clientAPIs.auth.logoutAPI().then(() => {
      router.push(PAGE_URLS.home);
      router.refresh();
    });
  };

  return (
    <nav className={S.background}>
      <section className={S.content}>
        <div className={S.left}>
          <Link href='/'>
            <Image src='/images/logo/newLogo.svg' alt='logo' width={134} height={40} />
          </Link>
          <div className={S.leftMenuWrapper}>
            {MAIN_MENU_LIST.map((item) => {
              switch (item.type) {
                case 'single':
                  return (
                    <div className={S.leftMenuItem} key={item.title}>
                      <Link href={item.href}>{item.title}</Link>
                    </div>
                  );
                case 'nested':
                  return (
                    <div className={S.leftMenuItem} key={item.title}>
                      {item.title} (nested)
                    </div>
                  );
                default:
                  throw new Error('새로운 GNB 메뉴 형식 정의가 필요해요');
              }
            })}
          </div>
        </div>
        <div className={S.right}>
          {isLoggedIn && (
            <div className={S.rightMenuItem} key='로그아웃' onClick={handleClickLogout}>
              로그아웃
            </div>
          )}
          {getSubMenuListWithLoginMenu().map((item) => {
            switch (item.type) {
              case 'single':
                return (
                  <div className={S.rightMenuItem} key={item.title}>
                    <Link href={item.href}>{item.title}</Link>
                  </div>
                );
              case 'nested':
                return (
                  <div className={S.rightMenuItem} key={item.title}>
                    {item.title} (nested)
                  </div>
                );
              default:
                throw new Error('새로운 GNB 메뉴 형식 정의가 필요해요');
            }
          })}
        </div>
      </section>
    </nav>
  );
};

export default ClientComponent;
