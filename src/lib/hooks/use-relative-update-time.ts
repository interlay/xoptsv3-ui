import { useEffect, useState } from "react";

export function useRelativeUpdateTime(fromTime: number, frequency: number): number {
    const initialRelTime = Date.now() - fromTime;
    const [relTime, setRelTime] = useState(initialRelTime);

    useEffect(() => {
        setRelTime(initialRelTime);
        const interval = setInterval(() => setRelTime(Date.now() - fromTime), frequency);
        return () => clearInterval(interval);
    }, [fromTime]);

    console.log(relTime);

    return relTime;
}
