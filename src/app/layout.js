
import "./globals.css";
import ClientOnlyWrapper from "./components/clientOnlyWarpper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from 'next/font/local';

// 첫 번째 폰트 정의 (기본 폰트)
const mainFont = localFont({
  src: [
    {
      path: '../../public/fonts/JAPANBRUSH.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-mainfont',
});

// 두 번째 폰트 정의 (특정 컴포넌트용)
const subFont = localFont({
  src: [
    {
      path: '../../public/fonts/AppleSDGothicNeoH.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-subfont',
});

export const metadata = {
  title: "KARATE INU",
  description: "KARATEINU_WepApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mainFont.variable} ${subFont.variable}`}>
      <body className={`bg-black flex min-h-dvh justify-center m-0 p-0 font-mainfont`} >
        <div className=" w-full h-screen max-w-[500px] max-h-[1080px] relative flex flex-col justify-between overflow-hidden bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(/image/kinu_bg.png)' }}
        >
          {children}
          <Analytics />
          <SpeedInsights />
          <ClientOnlyWrapper />
        </div>
      </body>
    </html>
  );
}
