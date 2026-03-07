import Image from "next/image";
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
                <Image src="/logo.png" alt="Logo" width={160} height={160} className="h-20 w-auto" />
                <Image src="/box.png" alt="BoxLogo" width={112} height={112} className="h-7 w-auto" />
              </div>
            </h1>
            <AuthProvider>{children}</AuthProvider>
          </main>
        </div>
      </body>
    </html>
  );
}