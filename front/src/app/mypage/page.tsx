'use client';
import React from 'react';
// import CheckLoginServerComponent from '@/container/CheckLoginServerComponent';
// import ServerComponent from './components/template.server';
import ClientComponent from './components/template.client';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const Mypage = () => {
  return (
    // <CheckLoginServerComponent>
    // {/* <ServerComponent /> */}
    <QueryClientProvider client={queryClient}>
      <ClientComponent />
    </QueryClientProvider>
    // </CheckLoginServerComponent>
  );
};

export default Mypage;
