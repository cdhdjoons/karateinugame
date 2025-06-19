'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const link = "https://t.me/KINU_AI_Chat"; // 복사할 링크

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
            <motion.div className=" w-full h-full relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="w-full absolute flex justify-center items-center">
                    <div className=" w-[37vmax] aspect-[540/465] relative ">
                        <Image
                            src="/image/kinu_invite_main.png"
                            alt="invitemain"
                            layout="fill"
                            objectFit="fill"
                            className="rounded-[23px]"
                            priority
                        />
                    </div>
                </div>
                <div className=" w-full h-full max-w-[500px] pb-[5%] relative flex flex-col justify-end items-center " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}

                    <div className="w-[90%] h-[80%] flex flex-col justify-center gap-[5%] ">
                        <div className=" w-full py-[5%] relative flex flex-col justify-between items-center font-normal drop-shadow-lg font-subfont bg-[#00000050] rounded-2xl">
                            <div className="flex flex-col pb-[2%] items-center  ">
                                <p className=" text-white text-[6.8vmin] sm:text-[4vmin] font-mainfont">How It Works<br />Invite to Earn</p>
                                <p className=" text-white text-[4.2vmin] sm:text-[3.5vmin] font-bold">Share your referral link</p>
                                <p className=" text-white text-[3.5vmin] sm:text-[2.2vmin] text-center">Invite others to Karate Inu by sharing your unique invitation link. Every successful referral unlocks access into the AI dojo.</p>
                            </div>
                            <div className="flex flex-col pb-[2%] items-center">
                                <p className=" text-white text-[4.2vmin] sm:text-[3.5vmin] font-bold">Your friends join the Karate Inu network</p>
                                <p className=" text-white text-[3.5vmin] sm:text-[2.2vmin] text-center">They begin asking questions, submitting insights, and participating in daily AI-powered crypto missions. Earning $KINU as they grow.</p>
                            </div>
                            <p className=" text-white text-[4.2vmin] sm:text-[3.5vmin] font-bold">1 friend = 1 AI PASS</p>
                            <p className=" text-white text-[3.5vmin] sm:text-[2.2vmin] text-center">Each referral earns you an AI Participation Pass, which can be used to unlock advanced missions, access exclusive tools, or earn bonus $KINU rewards.(Each pass may be worth up to 2,000 KINU depending on your activity and performance.)</p>
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
