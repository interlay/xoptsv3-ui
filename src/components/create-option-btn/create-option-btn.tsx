import { TFunction } from "next-i18next";
import React from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { SubmitStates } from "../../lib/types";
import { withTranslation } from "../../common/i18n";
import CopyButton from "./copy-button";

type CreateOptionProps = {
    readonly t: TFunction;
    submitState: SubmitStates;
    linkString: string;
};

const CreateOptionBtn = ({ t, submitState, linkString }: CreateOptionProps) => {
    switch (submitState) {
        case SubmitStates.None:
            return <Button type="submit">{t("create-option")}</Button>;
        case SubmitStates.Processing:
            return <Button disabled>{t("processing-creation")}</Button>;
        case SubmitStates.Success:
            return (
                <Col>
                    <Form.Text as="h5">{t("created-success")}</Form.Text>
                    <InputGroup>
                        <Form.Control type="text" readOnly value={linkString} />
                        <InputGroup.Append>
                            <CopyButton linkString={linkString} />
                        </InputGroup.Append>
                    </InputGroup>
                    <Form.Text>Or view it in your positions (todo)</Form.Text>
                </Col>
            );
        case SubmitStates.Failure:
            return <Button disabled>Failed (placeholder)</Button>;
    }
};

export default withTranslation("create")(CreateOptionBtn);