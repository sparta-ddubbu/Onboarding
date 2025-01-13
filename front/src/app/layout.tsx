'use client';

import './style.css';
import GnbComponent from '@/components/GNB/template';
import * as dotenv from 'dotenv';
dotenv.config();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <main>
          <GnbComponent />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
