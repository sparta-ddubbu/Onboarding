import { PAGE_URLS } from '@/constants/page-urls';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function withCheckLogin(Component: React.ComponentType) {
  return function wrappedComponent() {
    const router = useRouter();

    const isLoggedIn = false; // TODO: get from storage

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
