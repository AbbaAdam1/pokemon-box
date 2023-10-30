import AuthProvider from 'src/components/AuthProvider';

import 'src/styles/globals.css';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div id="root"></div>
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <main className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20">
            <h1 className="pb-5 text-5xl font-bold sm:text-4xl">
              <div className="flex items-center">
                <img src="logo.png" alt="Logo" className="h-20" />
                <img src="box.png" alt="boxlogo" className="h-7" />
              </div>
            </h1>
            <AuthProvider>{children}</AuthProvider>
          </main>
        </div>
      </body>
    </html>
  );
}