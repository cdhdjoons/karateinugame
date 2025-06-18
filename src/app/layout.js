
import "./globals.css";
import ClientOnlyWrapper from "./components/clientOnlyWarpper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Chewy } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

const chewy = Chewy({
  weight: '400', // Chewy는 단일 weight만 제공
  subsets: ['latin'], // 필요한 문자 집합 선택
  display: 'swap', // 폰트 로딩 최적화
});

export const metadata = {
  title: "KARATE INU",
  description: "KARATEINU_WepApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black flex min-h-dvh justify-center m-0 p-0 ${chewy.className}`} >
        <div className=" w-full h-screen max-w-[500px] max-h-[1080px] relative flex flex-col justify-between overflow-hidden bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(/image/hump_bg.png)' }}
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
