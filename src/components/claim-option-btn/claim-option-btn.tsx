import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitStates } from "../../lib/types";
import { withTranslation } from "../../common/i18n";
import { WithTranslation } from "next-i18next";

type ClaimOptionProps = {
    submitState: SubmitStates;
} & WithTranslation;

const ClaimOptionBtn = ({ t, submitState }: ClaimOptionProps) => {
    switch (submitState) {
        case SubmitStates.None:
            return (
                <Button block type="submit">
                    {t("claim-option-btn")}
                </Button>
            );
        case SubmitStates.Processing:
            return (
                <Button block disabled>
                    {t("processing-claim")}
                </Button>
            );
        case SubmitStates.Success:
            return (
                <Col>
                    <Form.Text as="h5">{t("claimed-success")}</Form.Text>
                    <Form.Text as="p">{t("claimed-success-subtext")}</Form.Text>
                </Col>
            );
        case SubmitStates.Failure:
            return (
                <Button block disabled>
                    Failed (placeholder)
                </Button>
            );
    }
};

export default withTranslation("claim")(ClaimOptionBtn);
