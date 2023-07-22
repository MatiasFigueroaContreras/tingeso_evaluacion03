"use client";

import { useEffect, useState } from "react";
import styles from "./timer.module.css";

export default function Timer({
    dateStart,
    run = true,
    dateEnd,
}: {
    dateStart: Date;
    run?: boolean;
    dateEnd?: Date;
}) {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    useEffect(() => {
        const setTime = (start: Date, end: Date) => {
            const difference = end.getTime() - start.getTime();

            const h = Math.floor(difference / (1000 * 60 * 60));
            setHours(h > 9 ? h.toString() : "0" + h);

            const m = Math.floor((difference / (1000 * 60)) % 60);
            setMinutes(m > 9 ? m.toString() : "0" + m);

            const s = Math.floor((difference / 1000) % 60);
            setSeconds(s > 9 ? s.toString() : "0" + s);
        };

        const setTimeNow = () => {
            const now = new Date();
            setTime(dateStart, now);
        };

        if (run) {
            const interval = setInterval(setTimeNow, 1000);
            return () => clearInterval(interval);
        } else {
            dateEnd
                ? setTime(dateStart, dateEnd)
                : setTime(dateStart, new Date());
        }
    }, [dateStart, run]);
    return (
        <section className={styles.timer}>
            <h3>Tiempo transcurrido</h3>
            <hr />
            <div className={styles.time}>
                <span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
        </section>
    );
}
