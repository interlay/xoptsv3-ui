import { WithTranslation, withTranslation } from "next-i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { intervalToDuration, formatDuration } from "date-fns";

export enum TimeGranularities {
    Second = 1000,
    Minute = 1000 * 60,
    Hour = 1000 * 3600,
}

type TimeUntilDateProps = {
    dateTo: number;
    granularity: TimeGranularities;
} & WithTranslation;

const TimeUntilDate = ({ t, dateTo, granularity }: TimeUntilDateProps) => {
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
        () => formatDuration(intervalToDuration({ start: dateFrom, end: dateTo }), { format }),
        [dateFrom]
    );

    useEffect(() => {
        const interval = setInterval(() => setDateFrom(Date.now()), granularity);
        return () => clearInterval(interval);
    }, []);

    return <Row>{t("time-until", { time: timeTill })}</Row>;
};

export default withTranslation("common")(TimeUntilDate);
