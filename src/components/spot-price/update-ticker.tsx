import { TFunction, withTranslation } from "next-i18next";
import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppState } from "../../lib/types";
import { useRelativeUpdateTime } from "../../lib/hooks/use-relative-update-time";

const UpdateTicker = ({ t }: { readonly t: TFunction }) => {
    const lastUpdate = useSelector((state: AppState) => state.prices.lastUpdated);
    const timeSinceUpdate = (useRelativeUpdateTime(lastUpdate, 1000) / 1000).toFixed();
    return <Row>{t("spot-updated", { time: timeSinceUpdate })}</Row>;
};

export default withTranslation("common")(UpdateTicker);
