import './style.css';
import * as dotenv from 'dotenv';
dotenv.config();
import GnbComponent from '@/components/GNB/template';
import { cookies } from 'next/headers';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore)?.get('accessToken')?.value;
  const isLoggedIn = Boolean(accessToken);

  return (
    <html lang='en'>
      <body>
        <main>
          <GnbComponent isLoggedIn={isLoggedIn} />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
