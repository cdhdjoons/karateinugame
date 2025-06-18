'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const link = "https://t.me/hump_ai_bot"; // 복사할 링크

        // 클립보드에 링크를 복사
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // 2초 후 복사 메시지 초기화
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-between items-center " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className="w-[90%] h-full flex flex-col justify-between">
                        <div className="w-full relative flex justify-center items-center  ">
                            <div className=" w-[37vmax] aspect-[417/471] relative ">
                                <Image
                                    src="/image/hump_invite_main.png"
                                    alt="invitemain"
                                    layout="fill"
                                    objectFit="fill"
                                    className="rounded-[23px]"
                                    priority
                                />
                            </div>
                        </div>
                        <div className=" w-full relative flex flex-col justify-around items-center font-normal drop-shadow-lg">
                            <div className="flex flex-col pb-[2%] items-center ">
                                <p className=" text-white text-[6vmin] sm:text-[4vmin] font-bold">How It Works - Invite to Earn</p>
                                <p className=" text-white text-[4.2vmin] sm:text-[3.5vmin] font-bold">Share your invitation link</p>
                                <p className=" text-white text-[3.5vmin] sm:text-[2.2vmin] text-center">Invite others to HUMP by sharing your personal referral link. For each successful join, you unlock a creative opportunity.</p>
                            </div>
                            <div className="flex flex-col pb-[2%] items-center">
                                <p className=" text-white text-[4.2vmin] sm:text-[3.5vmin] font-bold">Your friends join HUMP</p>
                                <p className=" text-white text-[3.5vmin] sm:text-[2.2vmin] text-center">They start submitting stories, co-creating with AI, and earning HUMP</p>
                            </div>
                            <p className=" text-white text-[4.2vmin] sm:text-[3.5vmin] font-bold">1 friend = 1 AI PASS</p>
                            <p className=" text-white text-[3.5vmin] sm:text-[2.2vmin] text-center"> Each referral gives you AI PASS lets you submit premium ideas, earn bonus rewards, or enter exclusive story contests. (Each pass is worth up to 2000 HUMP based on performance.)</p>
                        </div>
                        <div className="w-full flex justify-center relative gap-[5%]  ">
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-2  flex flex-col justify-center items-center relative bg-[#E55E00] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">Invite a friend</p>
                            </div>
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-2 flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">Copy Link</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
