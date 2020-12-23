import { intervalToDuration, formatDuration } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export enum TimeGranularities {
    Second = 1000,
    Minute = 1000 * 60,
    Hour = 1000 * 3600,
}

export function usePrettyTimeTill(toTime: number, granularity: TimeGranularities): string {
    const [dateFrom, setDateFrom] = useState(Date.now());
    const format = useMemo(() => {
        const intervals = ["years", "months", "days", "hours"];
        if (granularity <= TimeGranularities.Minute) {
            intervals.push("minutes");
        }
        if (granularity <= TimeGranularities.Second) {
            intervals.push("seconds");
        }
        return intervals;
    }, []);

    const timeTill = useMemo(
        () => formatDuration(intervalToDuration({ start: dateFrom, end: toTime }), { format }),
        [dateFrom]
    );

    useEffect(() => {
        const interval = setInterval(() => setDateFrom(Date.now()), granularity);
        return () => clearInterval(interval);
    }, []);

    return timeTill;
}
