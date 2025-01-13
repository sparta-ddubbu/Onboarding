import './style.css';
import * as dotenv from 'dotenv';
dotenv.config();
import GnbComponent from '@/components/GNB/template';

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
