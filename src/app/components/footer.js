'use client'

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TicketContext } from "./clientOnlyWarpper";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from "next/navigation";


export default function Footer() {
    // const { hasTickets } = useContext(TicketContext);
    const [menuColor, setMenuColor] = useState(0);
    const pathname = usePathname()
    // console.log(hasTickets);

    const useTickets = () => {
        const nowTickets = localStorage.getItem("tickets");
        localStorage.setItem("tickets", Number(nowTickets) - 1);
        window.dispatchEvent(new Event(TICKETS_UPDATE_EVENT));

    }

    const changeMenuColor = (num) => {
        setMenuColor(num);
    }

    useEffect(() => {
        if (pathname.includes('daily')) {
            setMenuColor(1)
        }
        if (pathname.includes('balance')) {
            setMenuColor(4)
        }
    }, [pathname])

    return (
        <AnimatePresence mode="wait">
            <motion.div className="  w-full max-w-[500px] flex justify-center items-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className=" w-full py-[2vmin] sm:pt-[1vmin] sm:pb-[2.3vmin] flex justify-evenly items-center bg-gradient-to-b from-[#7CD7FA25] to-[#00000090]">
                    <Link href="/" onClick={() => changeMenuColor(0)} className={`${menuColor === 0 ? 'bg-[#E55E00]' : 'bg-footerIconBg'}  w-[13%] aspect-[1/1] rounded-full flex justify-center items-center`}>
                        <div className=" w-[7vmin] sm:w-[3vmin] aspect-[36/36] relative active:scale-90 transition-transform duration-200 ">
                            <Image
                                src="/image/kinu_home.svg"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                    </Link>
                    <Link href="/daily" onClick={() => changeMenuColor(1)} className={`${menuColor === 1 ? 'bg-[#E55E00]' : 'bg-footerIconBg'}  w-[13%] aspect-[1/1] rounded-full flex justify-center items-center`}>
                        <div className="w-[7vmin] sm:w-[3vmin] aspect-[36/36] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/kinu_task.svg"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    <Link href="/balance">
                        <div className="w-[15vmin] sm:w-[8vmin] aspect-[72/74] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/kinu_game.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    <Link href="/invite" onClick={() => changeMenuColor(2)} className={`${menuColor === 2 ? 'bg-[#E55E00]' : 'bg-footerIconBg'}  w-[13%] aspect-[1/1] rounded-full flex justify-center items-center`}>
                        <div className="w-[7vmin] sm:w-[3vmin] aspect-[36/36] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/kinu_invite.svg"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    <Link href="/leaderboard" onClick={() => changeMenuColor(3)} className={`${menuColor === 3 ? 'bg-[#E55E00]' : 'bg-footerIconBg'}  w-[13%] aspect-[1/1] rounded-full flex justify-center items-center`}>
                        <div className="w-[7vmin] sm:w-[3vmin] aspect-[36/36] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/kinu_rank.svg"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}