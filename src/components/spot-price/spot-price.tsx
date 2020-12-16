import { TFunction } from "next-i18next";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../lib/types";
import { withTranslation } from "../../common/i18n";
import UpdateTicker from "./update-ticker";
import { updateBTCSpotPrice } from "../../common/utils";

const SpotPrice = ({ t }: { readonly t: TFunction }) => {
    const price = useSelector((state: AppState) => state.prices.price).toFixed(0);
    const dispatch = useDispatch();

    useEffect(() => {
        updateBTCSpotPrice(dispatch);
        const interval = setInterval(() => updateBTCSpotPrice(dispatch), 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Row>{t("spot")}</Row>
            <Row as="h5">{t("spot-price", { price })}</Row>
            <UpdateTicker />
        </>
    );
};

export default withTranslation("common")(SpotPrice);
