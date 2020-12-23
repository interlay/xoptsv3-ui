import React, { FormEvent, ReactElement, useState } from "react";
import {
    ButtonGroup,
    Card,
    Col,
    Form,
    Row,
    ToggleButton,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppState, FormControlElement, SubmitStates } from "../lib/types";
import { TFunction } from "next-i18next";
import DatePicker from "react-datepicker";
import ConnectButton from "../components/connect-button/connect-button";
import SpotPrice from "../components/spot-price/spot-price";
import CreateOptionBtn from "../components/create-option-btn/create-option-btn";
import { withTranslation } from "../common/i18n";
import { encodeOptionData, hoursToMs, daysToMs, getOptionLink } from "../common/utils";
import { createDefault } from "../lib/entities/option";

import "react-datepicker/dist/react-datepicker.css";
import { TimeGranularities, usePrettyTimeTill } from "../lib/hooks/use-time-till";

const VALIDITY_OPTIONS = {
    hours: [6, 12],
    days: [1, 2],
};

const Create = ({ t }: { readonly t: TFunction }): ReactElement => {
    const NOW = Date.now(); //update on every re-render

    const isConnected = useSelector((state: AppState) => state.user.isConnected);

    const defaultState = createDefault();
    defaultState.validityWindow = hoursToMs(VALIDITY_OPTIONS.hours[0]);
    const [state, setState] = useState(defaultState);

    const [submitState, setSubmitState] = useState(SubmitStates.None);
    const [serialisedOpt, setSerialisedOpt] = useState("");

    const handleChange = (e: React.ChangeEvent<FormControlElement>) =>
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

    const handleChangeDate = (date: Date) => {
        date.setUTCHours(12);
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
        setState({
            ...state,
            expiry: date.getTime(),
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState(SubmitStates.Processing);
        console.log(state);

        //mock create option
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 4000));

        setSerialisedOpt(encodeOptionData(state));
        console.log(serialisedOpt);
        setSubmitState(SubmitStates.Success);
    };

    const profitableUntil = () => Number(state.strikePrice) - Number(state.premium);
    const tillExpiry = usePrettyTimeTill(state.expiry, TimeGranularities.Minute);

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} sm={12} md={10} lg={8}>
                <Card className="my-5">
                    <Card.Header>
                        <Row>
                            <Col>
                                <Row as="h5">{t("new-option")}</Row>
                                <Row>{t("new-option-subtext")}</Row>
                            </Col>
                            <Col>
                                <SpotPrice
                                    collateral={state.collateral}
                                    underlying={state.underlying}
                                />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
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
                                                value="european"
                                                checked={state.optionType === "european"}
                                                onChange={handleChange}
                                            >
                                                {t("create:type-european")}
                                            </ToggleButton>
                                            <ToggleButton
                                                type="radio"
                                                name="optionType"
                                                value="american"
                                                checked={state.optionType === "american"}
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
                                        onChange={handleChangeDate}
                                    />
                                    <Form.Text>
                                        {t("common:time-until", { time: tillExpiry })}
                                    </Form.Text>
                                </Col>
                                <Col>
                                    {
                                        // type error should be fixed once next-i18next pulls in
                                        // react-i18next 11.8.0, giving a fully type-safe
                                        // translation function
                                    }
                                    <Form.Control
                                        readOnly
                                        plaintext
                                        value={t("common:noon-time")}
                                    />
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
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Label>{t("validity")}</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        name="validityWindow"
                                        value={state.offerExpiry}
                                        onChange={handleChange}
                                    >
                                        {VALIDITY_OPTIONS.hours.map((count) => (
                                            <option
                                                value={NOW + hoursToMs(count)}
                                                key={`${count}h`}
                                            >
                                                {t("validity-hours", { count })}
                                            </option>
                                        ))}
                                        {VALIDITY_OPTIONS.days.map((count) => (
                                            <option value={NOW + daysToMs(count)} key={`${count}d`}>
                                                {t("validity-days", { count })}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row}>
                                <Col xs={3} className="align-self-center">
                                    <Form.Label>{t("profitable-until")}</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={t("common:exchange-rate", {
                                            amount: profitableUntil(),
                                            underlying: state.underlying,
                                            collateral: state.collateral,
                                        })}
                                    />
                                </Col>
                            </Form.Group>
                            {isConnected ? (
                                <CreateOptionBtn
                                    submitState={submitState}
                                    linkString={getOptionLink(serialisedOpt)}
                                />
                            ) : (
                                <ConnectButton />
                            )}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default withTranslation(["create", "common"])(Create);
