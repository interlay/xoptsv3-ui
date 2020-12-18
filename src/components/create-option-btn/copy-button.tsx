import { TFunction } from "next-i18next";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from "../../common/i18n";
import { WithTranslation } from "next-i18next";

type CopyButtonProps = {
    readonly t: TFunction;
    linkString: string;
} & WithTranslation;

enum CopyStates {
    None,
    Failed,
    Success,
}

const CopyButton = ({ t, linkString }: CopyButtonProps) => {
    const [copyState, setCopyState] = useState(CopyStates.None);

    const copyStr = (link: string) => () => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                setCopyState(CopyStates.Success);
                setTimeout(() => setCopyState(CopyStates.None), 2000);
            })
            .catch(() => {
                setCopyState(CopyStates.Failed);
            });
    };

    return (
        <Button
            variant={`outline-${copyState === CopyStates.Failed ? "danger" : "primary"}`}
            onClick={copyStr(linkString)}
        >
            {(() => {
                switch (copyState) {
                    case CopyStates.None:
                        return t("copy");
                    case CopyStates.Success:
                        return t("copy-success");
                    case CopyStates.Failed:
                        return t("copy-failure");
                }
            })()}
        </Button>
    );
};

export default withTranslation("common")(CopyButton);
