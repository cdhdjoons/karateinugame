'use client'
import Image from "next/image";
import '../../../styles/leaderboard.css';
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import rankerDb from "../db/rankerDb";

export default function LeaderBoard() {

    const [n2o, setN2O] = useState(0);
    const [teleId, setTeleId] = useState('unknown');
    const [rank, setRank] = useState(0);
    //홀더 숫자 상승 
    const [holderCount, setHolderCount] = useState(110);

    useEffect(() => {
        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        const baseDate = new Date("2025-02-19").getTime(); // 기준 날짜
        const now = Date.now(); // 현재 시간
        const twoDays = 1000 * 60 * 60 * 24 * 2; // 2일을 밀리초로
        const dayCount = Math.floor((now - baseDate) / twoDays);

        if (storedN2O !== null) {
            setN2O(Number(storedN2O));
        }
        setHolderCount(holderCount + (dayCount / 10));
        // console.log(dayCount);
    }, []);

    //랭킹 순위
    useEffect(() => {
        const randomRank = Math.floor(Math.random() * (98000 - 95000 + 1)) + 95000;

        setRank(randomRank);

    }, [n2o]);

    useEffect(() => {
        const checkTelegramSDK = () => {
            if (typeof window !== 'undefined' && window.Telegram) {
                const user = window.Telegram.WebApp.initDataUnsafe;
                if (user) {
                    console.log('Telegram User:', user);
                    if (user.user) {
                        setTeleId(user.user.first_name);
                    } else {
                        setTeleId('--')
                        setN2O(0)
                    }
                }
            } else {
                setTimeout(checkTelegramSDK, 1000); // 1초 후 다시 확인
            }
        };

        checkTelegramSDK(); // 초기 실행
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full overflow-hidden "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly items-center " >
                    <div className=" w-[90%] flex justify-between items-center ">
                        <p className=" text-center text-[4vmax] sm:text-[4vmin] text-white font-bold [-webkit-text-stroke:0.5px_black] ">Leaderboard</p>
                        <p className=" text-center text-[2.5vmax] text-[#00FF11] font-normal [-webkit-text-stroke:0.5px_black] ">{holderCount}k Holders</p>
                    </div>
                    <div className="  w-[90%] h-[90%] py-3 flex justify-center items-center  " >
                        <div className="scroll-container w-[95%] h-[95%] flex flex-col gap-3 overflow-scroll overflow-x-hidden px-[2%]">
                            {rankerDb.map((ranker, index) => (
                                <div key={ranker.name} className="w-full flex justify-stretch items-center bg-balanceBg rounded-3xl " >
                                    <div className=" relative w-[20%] aspect-[72/74]">
                                        <Image
                                            src="/image/hump_game.png"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className=" w-[45%] text-center text-white font-bold text-[3.5vmin] sm:text-[1.5vmin]">{ranker.name}</p>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[1.5vmin]">{ranker.score}</p>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[2vmin]">{index > 8 ? `0${index + 1}` : `00${index + 1}`}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
