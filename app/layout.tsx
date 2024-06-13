import NavMenu from '@/components/core/nav-menu/nav-menu.component';
import './globals.sass';
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '700', '800', '900', '1000'],
  subsets: ['latin'],
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: "Productive",
  description: "Productive application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
