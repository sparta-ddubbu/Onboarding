type MenuNestedItemType = {
  type: 'nested';
  title: string;
  children: MenuItemType[];
};

type MenuSingleItemType = {
  type: 'single';
  title: string;
  href: string;
};

type MenuItemType = MenuNestedItemType | MenuSingleItemType;

export const MAIN_MENU_LIST: MenuItemType[] = [
  {
    type: 'nested',
    title: '부트캠프',
    children: [
      {
        type: 'nested',
        title: '웹개발',
        children: [
          { type: 'single', title: '백엔드개발', href: 'TODO' },
          { type: 'single', title: '단기 심화 Java', href: 'TODO' },
        ],
      },
    ],
  },
  { type: 'single', title: '취업 지원', href: 'TODO' },
  { type: 'single', title: '무료 콘텐츠', href: 'TODO' },
  { type: 'single', title: '이벤트', href: 'TODO' },
];

export const SIGNUP_MENU_ITEM: MenuItemType = { type: 'single', title: '회원가입', href: '/sign-up' };
export const LOGIN_MENU_ITEM: MenuItemType = { type: 'single', title: '로그인', href: '/sign-in' };
export const MYPAGE_MENU_ITEM: MenuItemType = { type: 'single', title: '마이페이지', href: '/mypage' };
export const SUB_MENU_LIST: MenuItemType[] = [{ type: 'single', title: '고객센터', href: 'TODO' }];
