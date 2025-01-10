'use client';

import './style.css';
import GnbComponent from '@/components/GNB';
import { StackProvider } from '@teamsparta/stack-core';

// export const metadata = {
//   title: 'My App',
//   description: 'Next.js 13.4 App Router with TypeScript',
// };

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
