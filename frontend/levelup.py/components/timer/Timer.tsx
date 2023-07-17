"use client";

import { useEffect, useState } from "react";
import styles from "./timer.module.css";

export default function Timer({ dateStart }: { dateStart: Date }) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - dateStart.getTime();

            const h = Math.floor(
                (difference / (1000 * 60 * 60))
            );
            setHours(h);

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
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
