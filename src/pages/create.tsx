import React, { FormEvent, ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppState, FormControlElement } from "../lib/types";
import { TFunction } from "next-i18next";
import ConnectButton from "../components/connect-button/connect-button";
import SpotPrice from "../components/spot-price/spot-price";
import { withTranslation } from "../common/i18n";
import { encodeOptionData, hoursToMs, daysToMs } from "../common/utils";
import { Option } from "../lib/types/option";

const VALIDITY_OPTIONS = {
    hours: [6, 12],
    days: [1, 2],
};

enum SubmitStates {
    None,
    Processing,
    Success,
    Failure,
}

const Create = ({ t }: { readonly t: TFunction }): ReactElement => {
    const isConnected = useSelector((state: AppState) => state.user.isConnected);

    const defaultState: Option = {
        size: "",
        underlying: "BTC",
        strikePrice: "",
        collateral: "USDT",
        optionType: "American",
        expiry: 0,
        premium: "",
        sellerBTCAddress: "",
        validityWindow: hoursToMs(VALIDITY_OPTIONS.hours[0]),
        recipientWhitelist: "",
    };
    const [state, setState] = useState(defaultState);

    const [submitState, setSubmitState] = useState(SubmitStates.None);

    const handleChange = (e: React.ChangeEvent<FormControlElement>) =>
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState(SubmitStates.Processing);
        console.log(state);
        const serialised = encodeOptionData(state);
        console.log(serialised);
    };

    const profitableUntil = () => Number(state.strikePrice) - Number(state.premium);

    return (
        <Card className="mt-5">
            <Card.Header>
                <Row>
                    <Col>
                        <Row as="h5">{t("new-option")}</Row>
                        <Row>{t("new-option-subtext")}</Row>
                    </Col>
                    <Col>
                        <SpotPrice />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:size")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="number" name="size" value={state.size} onChange={handleChange} />
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
                        <Col>
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
                            <Col>
                                <Form.Label>{t("create:type")}</Form.Label>
                            </Col>
                            <Col>
                                <Form.Check
                                    inline
                                    label={t("create:type-american")}
                                    type={"radio"}
                                    name="optionType"
                                    //value={state.optionType}
                                    //onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label={t("create:type-european")}
                                    type={"radio"}
                                    name="optionType"
                                    //value={state.optionType}
                                    //onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:expiry")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value="Placeholder for date"></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
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
                        <Col>
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
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:validity")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                name="validityWindow"
                                value={state.validityWindow}
                                onChange={handleChange}
                            >
                                {VALIDITY_OPTIONS.hours.map((count) => (
                                    <option value={hoursToMs(count)} key={`${count}h`}>
                                        {t("create:validity-hours", { count })}
                                    </option>
                                ))}
                                {VALIDITY_OPTIONS.days.map((count) => (
                                    <option value={daysToMs(count)} key={`${count}d`}>
                                        {t("create:validity-days", { count })}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <hr />
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:profitable-until")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue={t("create:profitable-cutoff", {
                                    cutoff: profitableUntil(),
                                    underlying: state.underlying,
                                    collateral: state.collateral,
                                })}
                            />
                        </Col>
                    </Form.Group>
                    {isConnected ? <Button type="submit">Placeholder!</Button> : <ConnectButton />}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default withTranslation(["common", "create"])(Create);
