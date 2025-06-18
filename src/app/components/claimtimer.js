"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpCircle } from "lucide-react";
import questionDb from "../db/questionDb";

export default function ClaimTimer() {
    const TIMER_DURATION = 21600; // 6 hours in seconds

    const [time, setTime] = useState(TIMER_DURATION); // 10초 타이머
    const [onClaim, setOnClaim] = useState(true);
    const [n2o, setN2O] = useState(0);
    const timerRef = useRef(null);
    const hasFinished = useRef(false);
    const [tickets, setTickets] = useState(0);
    const [week, setWeek] = useState(0);


    useEffect(() => {
        // localStorage에서 시작 시간 불러오기
        const storedStartTime = localStorage.getItem("timerStartTime");
        const lastCompletionTime = localStorage.getItem("lastCompletionTime");//timer 만료 후 체크위한 값


        if (storedStartTime) {
            const elapsedTime = Math.floor((Date.now() - Number(storedStartTime)) / 1000);
            const remainingTime = Math.max(TIMER_DURATION - elapsedTime, 0);

            if (remainingTime > 0) {
                // hasFinished.current = false;
                setTime(remainingTime);
                setOnClaim(false);
                startInterval(remainingTime);
            } else {
                // Timer has finished while away
                if (!lastCompletionTime || lastCompletionTime !== storedStartTime) {
                    // Only increment N2O if we haven't recorded this completion
                    handleN2O();
                    localStorage.setItem("lastCompletionTime", storedStartTime);
                }
                localStorage.removeItem("timerStartTime");
                setOnClaim(true);
            }
        }

        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        if (storedN2O) {
            setN2O(Number(storedN2O));
        }

        // 초기 티켓 값 불러오기
        const storedTickets = localStorage.getItem("tickets");
        if (storedTickets !== null) {
            setTickets(Number(storedTickets));
        }
        //몇 주 차 인지 값 불러오기
        const storedWeek = localStorage.getItem("week");
        if (storedWeek !== null) {
            setWeek(Number(storedWeek));
        }


        // Cleanup interval on unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startInterval = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setOnClaim(true);
                    const currentStartTime = localStorage.getItem("timerStartTime");
                    localStorage.setItem("lastCompletionTime", currentStartTime);
                    localStorage.removeItem("timerStartTime");
                    if (!hasFinished.current) {
                        handleN2O();
                        hasFinished.current = true;
                    }
                    return 0; // Return 0 instead of 10
                }
                return prev - 1;
            });
        }, 1000);
    };

    const startTimer = () => {
        setOnClaim(false);
        setTime(TIMER_DURATION);
        hasFinished.current = false;
        localStorage.setItem("timerStartTime", Date.now().toString());
        startInterval();
    };

    const handleN2O = () => {
        const currentN2O = localStorage.getItem("n2o");
        const newN2O = (Number(currentN2O) || 0) + 2000; // 🔥 기존 값에 1000 더함
        localStorage.setItem("n2o", newN2O); // 🔥 업데이트된 값 저장
        setN2O(newN2O); // 🔥 상태 업데이트

    };



    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    // 프로그레스 바 너비 계산
    const progressWidth = onClaim ? "251.2" : (1 - (TIMER_DURATION - time) / TIMER_DURATION) * 251.2;

    // 작은 원의 위치 계산
    const progress = 1 - parseFloat(progressWidth) / 251.2; // 0 (비어 있음) ~ 1 (꽉 참)
    const angle = (progress * 360) * (Math.PI / 180); // 각도 (라디안), rotate-90 고려
    const smallCircleX = 50 + 40 * Math.cos(angle); // x 좌표
    const smallCircleY = 50 + 40 * Math.sin(angle); // y 좌표

    const activeClaim = () => {
        setOnClaim(true);
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div className={` h-full flex flex-col justify-evenly items-center `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="  w-[90%] h-[13%] flex flex-col gap-[5%] justify-evenly items-center relative">
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[30px] flex justify-between items-center w-full py-[1%] px-4">
                        <div className="w-[8vmin] sm:w-[5vmin] aspect-[60/60] relative  ">
                            <Image
                                src="/image/hump_x_icon.svg"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <p className="text-black text-[4vmin] sm:text-[2vmin]">Join our X , earn HUMP Point</p>
                        <p className="text-black h-full opacity-60">...</p>
                    </a>
                </div>
                <div className=" w-[90%] h-[30%] flex flex-col justify-evenly ">
                    <div className=" py-[2.5%] bg-mainBoxBg rounded-[23px] w-full flex justify-center items-center relative">
                        <div className=" w-full flex justify-evenly gap-[10%]  ">
                            <div className="w-[10vmin] sm:w-[6vmin] aspect-[72/74] relative  ">
                                <Image
                                    src="/image/hump_game.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <p className={` text-white text-[5vmin] sm:text-[3vmin] font-bold mt-1 `}>MY HUMP Point</p>
                        </div>
                        <p className=" w-[50%]  py-[2%] text-center text-[#FFCC00] text-[5.5vmin] sm:text-[3.5vmin]
                        active:scale-90 transition-transform duration-200">{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
                    </div>
                    <div className=" py-[2.5%] bg-mainBoxBg rounded-[23px] w-full flex justify-center items-center relative">
                        <div className=" w-full flex justify-evenly items-center gap-[10%] ">
                            <div className="w-[10vmin] sm:w-[7vmin] aspect-[72/74] relative  ">
                                <Image
                                    src="/image/hump_ticket_icon.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <p className={` text-white text-[5vmin] sm:text-[3vmin] font-bold `}>My Tickets</p>
                        </div>
                        <p className=" w-[50%] py-[2%] text-center text-[#FFCC00] text-[5.5vmin] sm:text-[3.5vmin]
                        active:scale-90 transition-transform duration-200">{tickets}</p>
                    </div>
                </div>
                <div className="w-full h-[40%] pb-[1%] flex justify-center items-center relative ">
                    <div className="w-full h-full flex justify-center items-center ">
                        <div className=" h-full aspect-[264/264] relative active:scale-90 transition-transform duration-200">
                            {/* <Image
                                src="/image/pdb_rankcircle_border.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="fill"
                                className="z-[90]"
                            /> */}
                            <svg
                                className="absolute left-[50%] top-[50%] p-[4%] -translate-y-[50%] -translate-x-[50%] w-[115%] transform rotate-90" // 6시 방향부터 시작하도록 회전
                                viewBox="0 0 100 100"
                            >
                                <defs>
                                    <linearGradient id="gradientColors" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FDC038" />
                                        <stop offset="50%" stopColor="#FDC038" />
                                        <stop offset="100%" stopColor="#FDC038" />
                                    </linearGradient>
                                    {/* 작은 원용 패턴 정의 */}
                                    <pattern id="smallCirclePattern" x="0" y="0" width="100%" height="100%" patternUnits="objectBoundingBox">
                                        <image
                                            href="/image/hump_game.png"
                                            x="-10"
                                            y="-0"
                                            width="15"
                                            height="15"
                                            preserveAspectRatio="xMidYMid slice"
                                            transform="rotate(270 3 3)"
                                        />
                                    </pattern>
                                </defs>
                                {/* 배경 원 */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="black"
                                    strokeWidth="5"
                                    fill="none"
                                />
                                {/* 진행 원 */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#gradientColors)"
                                    strokeWidth="5"
                                    fill="none"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={progressWidth}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            {/* 작은 원 */}
                            <svg
                                className="absolute left-[50%] top-[50%] p-[4%] -translate-y-[50%] -translate-x-[50%] w-[115%] transform rotate-90 z-[90]"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx={smallCircleX}
                                    cy={smallCircleY}
                                    r="9"
                                    fill="url(#smallCirclePattern)"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className=" absolute left-[50%] top-[50%] p-[4%] -translate-y-[50%] -translate-x-[50%] w-[90%] h-[90%] rounded-full ">
                                <div className="w-full flex justify-center items-center aspect-[1/1] relative rounded-full bg-cover bg-no-repeat " style={{ backgroundImage: 'url(/image/hump_circle_bg.png)' }}>
                                    {onClaim ? <div className="w-[50%] relative aspect-[122/197] duration-500">
                                        <Image
                                            src="/image/hump_stay.png"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="fill"
                                            className=" rounded-full"
                                        />
                                    </div> :
                                        <div className="w-full relative aspect-[1/1] duration-500">
                                            <Image
                                                src="/image/hump_run.gif"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="fill"
                                                className=" rounded-full"
                                            />
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[13%] flex justify-center items-center relative ">
                    <div className="w-[90%] py-[5%] px-[3%] h-full sm:w-[90%] relative flex justify-between items-center rounded-[23px] bg-mainBoxBg">
                        <div className="w-[70%] flex justify-center gap-[5%] items-center  ">
                            <p className="  text-[#E55E00] text-[4.5vmin] sm:text-[2.5vmin] font-bold">Earn 2,000 HUMP</p>
                            <p className=" text-[#808080] text-[4.5vmin] sm:text-[2.5vmin] font-bold ">{formatTime(time)}</p>
                        </div>
                        {/* <div className="w-full relative flex justify-center py-[2%] items-end ">
                            <div className="w-[80%] h-[1vmin] xs:h-[0.8vmin] sm:h-[0.7vmin] rounded-3xl bg-[#787880] relative ">
                                <div className="w-full bg-[#007AFF] rounded-3xl h-full absolute left-0" style={{ width: progressWidth }}></div>
                                <div className="w-[4vmin] sm:w-[2.5vmin] aspect-[1/1] bg-white rounded-full absolute -top-[150%] xs:-top-[200%] sm:-top-[150%]" style={{ left: progressWidth }}></div>
                            </div>
                        </div> */}
                        <div className="w-[30%] flex justify-center relative  ">
                            {onClaim ? <div onClick={startTimer} className="w-full rounded-[24px] py-2  flex flex-col justify-center items-center relative bg-[#F7AD2A] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">Earn Start</p>
                            </div> :
                                <div className="w-full rounded-[24px] py-2  flex flex-col justify-center items-center relative bg-[#282828] active:scale-90 transition-transform duration-100">
                                    <p className=" text-white text-[3.5vmin] sm:text-[1.5vmin] z-10">On Start</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>



            </motion.div>
        </AnimatePresence>
    );
};

