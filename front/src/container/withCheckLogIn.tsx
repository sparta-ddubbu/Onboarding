import apiClient from '@/apis/apiClient';
import { PAGE_URLS } from '@/constants/page-urls';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function withCheckLogin(Component: React.ComponentType) {
  return function wrappedComponent() {
    const router = useRouter();

    const isLoggedIn = Boolean(apiClient.defaults.headers['Authorization']);
    // [BUG] 페이지 이동 시 날라감

    useEffect(() => {
      if (!isLoggedIn) {
        if (typeof window !== 'undefined') {
          const confirmed = confirm('로그인이 필요해요!');

          if (confirmed) {
            router.push(PAGE_URLS.home);
          }
        }
      }
    }, [router, isLoggedIn]);

    return <Component />;
  };
}

export default withCheckLogin;
