'use client';

import './style.css';
import GnbComponent from '@/components/GNB/template';
import { StackProvider } from '@teamsparta/stack-core';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <main>
          <StackProvider theme='nbcLight'>
            <GnbComponent />
            {children}
          </StackProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
