import React, { ReactElement } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateIsUserConnectedAction } from "../../lib/actions";
import { useEthers } from "../../lib/hooks";
import { TFunction, withTranslation } from "next-i18next";

const ConnectButton = ({ t }: { readonly t: TFunction }): ReactElement => {
    const dispatch = useDispatch();
    const provider = useEthers();

    if (provider === null) {
        return (
            <Button block disabled>
                {t("missing-metamask")}
            </Button>
        );
    } else {
        const connect = async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const accounts = await provider.provider.request!({ method: "eth_requestAccounts" });
            const address = accounts[0];
            dispatch(updateIsUserConnectedAction(true, address));
        };

        return (
            <Button block onClick={connect}>
                {t("connect-wallet")}
            </Button>
        );
    }
};

export default withTranslation("common")(ConnectButton);
