import './style.css';
import GnbComponent from '@/components/GNB';

export const metadata = {
  title: 'My App',
  description: 'Next.js 13.4 App Router with TypeScript',
};

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
