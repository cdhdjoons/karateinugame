'use client'

import Image from "next/image";
import ClaimTimer from "./components/claimtimer";
import Intro from "./components/intro";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import questionDb from "./db/questionDb";

export default function Home() {

  useEffect(() => {
    //몇 주 차인지 보여주기
    const baseDate = new Date("2025-04-10").getTime(); // 기준 날짜
    const now = Date.now(); // 현재 시간
    const sevenDays = 1000 * 60 * 60 * 24 * 7; // 7일을 밀리초로
    const dayCount = Math.floor((now - baseDate) / sevenDays);

    // 49주가 되면 0으로 리셋
    const weekCycle = dayCount % questionDb.length; // 0부터 49까지 반복

    localStorage.setItem("week", weekCycle);
  }, []);

  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full max-w-[500px] relative flex flex-col " >
        <Intro />
        <AnimatePresence mode="wait">
          <motion.div className="w-full flex justify-center relative "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-[500px] flex flex-col items-start relative ">
              <div className="w-full aspect-[612/189] relative">
                <Image
                  src="/image/hump_title_bg.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="cover"
                />
                <p className="text-white absolute left-[5%] top-[45%] -translate-y-[50%] text-[5.5vmin] sm:text-[4.5vmin] xs:text-[6.5vmin]">Welcome<br/><span className="text-[7.5vmin] sm:text-[5.5vmin]">Humpty Dumpty Ai</span></p>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
        <ClaimTimer />
      </div>
    </div>
  );
}
