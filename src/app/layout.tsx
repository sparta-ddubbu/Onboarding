export const metadata = {
  title: 'My App',
  description: 'Next.js 13.4 App Router with TypeScript',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <header>
          <h1>My App</h1>
          <nav>
            <a href='/'>[홈]</a>
            <a href='/sign-in'>[로그인]</a>
            <a href='/sign-up'>[회원가입]</a>
          </nav>
        </header>
        <br />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
