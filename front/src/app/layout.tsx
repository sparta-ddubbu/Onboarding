'use client';

import './style.css';
import GnbComponent from '@/components/GNB/template';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StackProvider } from '@teamsparta/stack-core';
import * as dotenv from 'dotenv';
dotenv.config();

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <main>
          <StackProvider theme='nbcLight'>
            <QueryClientProvider client={queryClient}>
              <GnbComponent />
              {children}
            </QueryClientProvider>
          </StackProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
