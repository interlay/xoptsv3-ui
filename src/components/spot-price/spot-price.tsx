import { TFunction } from "next-i18next";
import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppState } from "../../lib/types";
import { withTranslation } from "../../common/i18n";

const SpotPrice = ({ t }: { readonly t: TFunction }) => {
    const price = useSelector((state: AppState) => state.prices.price).toFixed(0);
    const lastUpdate = useSelector((state: AppState) => state.prices.lastUpdated);
    const timeSinceUpdate = ((Date.now() - lastUpdate) / 1000).toFixed(0);
    return (
        <>
            <Row>{t("spot")}</Row>
            <Row as="h5">{t("spot-price", { price })}</Row>
            <Row>{t("spot-updated", { time: timeSinceUpdate })}</Row>
        </>
    );
};

export default withTranslation("common")(SpotPrice);
