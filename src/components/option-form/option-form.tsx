import { WithTranslation, withTranslation } from "next-i18next";
import React, { ReactElement } from "react";
import {
    ButtonGroup,
    Col,
    Form,
    Row,
    ToggleButton,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FormControlElement } from "../../lib/types";
import { Option } from "../../lib/entities/option";

type OptionFormProps = {
    readOnly: boolean;
    state: Option;
    handleChange?: (e: React.ChangeEvent<FormControlElement>) => void;
    handleChangeDate?: (date: Date) => void;
} & WithTranslation;

const OptionForm = ({
    t,
    readOnly,
    state,
    handleChange,
    handleChangeDate,
}: OptionFormProps): ReactElement => {
    if (!readOnly && (!handleChange || !handleChangeDate)) {
        throw new Error("Form component invoked non-read-only, but no change handlers were passed");
    }

    const changeProps = readOnly ? { readOnly } : { onChange: handleChange };
    const dateChangeWrapper = (date: Date) => {
        // Typescript cannot recognise that if !readonly && !handleChangeDate,
        // an error would have been thrown above
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        readOnly ? null : handleChangeDate!(date);
    };

    return (
        <>
            <Form.Group as={Row}>
                <Col xs={3} className="align-self-center">
                    <Form.Label>{t("create:size")}</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        name="size"
                        value={state.size}
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        disabled
                        name="underlying"
                        value={state.underlying}
                        onChange={handleChange}
                    >
                        <option value="BTC">{t("BTC")}</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col xs={3}>
                    <Form.Label>{t("create:strike")}</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        name="strikePrice"
                        value={state.strikePrice}
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        name="collateral"
                        value={state.collateral}
                        onChange={handleChange}
                    >
                        <option value="USDT">{t("USDT")}</option>
                        <option value="DAI">{t("DAI")}</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <fieldset>
                <Form.Group as={Row}>
                    <Col xs={3}>
                        <Form.Label>{t("create:type")}</Form.Label>
                    </Col>
                    <Col>
                        <ButtonGroup toggle>
                            <ToggleButton
                                type="radio"
                                name="optionType"
                                value="European"
                                checked={state.optionType === "European"}
                                onChange={handleChange}
                            >
                                {t("create:type-european")}
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                name="optionType"
                                value="American"
                                checked={state.optionType === "American"}
                                onChange={handleChange}
                            >
                                {t("create:type-american")}
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Form.Group>
            </fieldset>
            <Form.Group as={Row}>
                <Col xs={3}>
                    <Form.Label>{t("create:expiry")}</Form.Label>
                </Col>
                <Col>
                    <DatePicker
                        name="expiry"
                        selected={new Date(state.expiry)}
                        onChange={dateChangeWrapper}
                    />
                </Col>
                <Col>
                    {
                        // type error should be fixed once next-i18next pulls in
                        // react-i18next 11.8.0, giving a fully type-safe
                        // translation function
                    }
                    <Form.Control readOnly plaintext value={t("noon-time")} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col xs={3}>
                    <Form.Label>{t("create:premium")}</Form.Label>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl
                            type="number"
                            name="premium"
                            value={state.premium}
                            onChange={handleChange}
                        ></FormControl>
                        <InputGroup.Append>
                            <InputGroup.Text>{state.collateral}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col xs={3}>
                    <Form.Label>{t("create:btc-address")}</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        name="sellerBTCAddress"
                        value={state.sellerBTCAddress}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>
        </>
    );
};

export default withTranslation(["common", "create"])(OptionForm);
