import { WithTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../lib/types";
import { withTranslation } from "../../common/i18n";
import UpdateTicker from "./update-ticker";
import { updateBTCSpotPrice } from "../../common/utils";

type SpotPriceProps = {
    collateral: string;
    underlying: string;
} & WithTranslation;

const SpotPrice = ({ t, collateral, underlying }: SpotPriceProps) => {
    const amount = useSelector((state: AppState) => state.prices.price).toFixed(0);
    const dispatch = useDispatch();

    useEffect(() => {
        updateBTCSpotPrice(dispatch, underlying, collateral);
        const interval = setInterval(
            () => updateBTCSpotPrice(dispatch, underlying, collateral),
            10000
        );
        return () => clearInterval(interval);
    }, [collateral, underlying]);

    return (
        <>
            <Row>{t("spot")}</Row>
            <Row as="h5">{t("exchange-rate", { amount, collateral, underlying })}</Row>
            <UpdateTicker />
        </>
    );
};

export default withTranslation("common")(SpotPrice);
