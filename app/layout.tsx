import './globals.sass';
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ModalUtilsConfigurator } from '@/util/modal.util';

import ModalWrapper from '@/components/core/modals/modal-wrapper/modal-wrapper.component';
import SideNav from '@/components/core/side-nav/side-nav.component';

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
        <ModalWrapper />
        <ModalUtilsConfigurator />
        <SideNav />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
