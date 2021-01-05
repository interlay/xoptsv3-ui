import { TFunction } from "next-i18next";
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
import { AppState, FormControlElement, SubmitStates } from "../lib/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { createDefault } from "../../xopts-lib/models/option";
import { daysToMs, encodeOptionData, getOptionLink, hoursToMs } from "../common/utils";
import ConnectButton from "../components/connect-button/connect-button";
import CreateOptionBtn from "../components/create-option-btn/create-option-btn";
import { withTranslation } from "../common/i18n";

import { TimeGranularities, usePrettyTimeTill } from "../lib/hooks/use-time-till";
import SpotPrice from "../components/spot-price/spot-price";
import { storeOption } from "../lib/actions";
import { useXOpts } from "../lib/hooks/use-xopts";

const VALIDITY_OPTIONS = {
    hours: [6, 12],
    days: [1, 2],
};

const Create = ({ t }: { readonly t: TFunction }): ReactElement => {
    const NOW = Date.now(); //update on every re-render

    const isConnected = useSelector((state: AppState) => state.user.isConnected);

    const dispatch = useDispatch();
    const defaultOption = createDefault({
        offerExpiry: NOW + hoursToMs(VALIDITY_OPTIONS.hours[0]),
    });
    const [option, setOption] = useState(defaultOption);

    const [submitState, setSubmitState] = useState(SubmitStates.None);
    const [serialisedOpt, setSerialisedOpt] = useState("");

    const xopts = useXOpts();

    const handleChange = (e: React.ChangeEvent<FormControlElement>) =>
        setOption({
            ...option,
            [e.target.name]: e.target.value,
        });

    const handleChangeDate = (date: Date) => {
        date.setUTCHours(12);
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
        setOption({
            ...option,
            expiry: date.getTime(),
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState(SubmitStates.Processing);

        if (xopts) {
            // TODO: at this point, we should start to load but not update the view yet
            // We should only update the view once the option has been stored
            // We do not have a direct way to wait on the option creation so
            // but it will be added to the store so we can check if it is there or not
            // We can pass a custom ID to the option so I suggest generating
            // a UUID here and set it as "pending" in the state
            // until the option with the given UUID appears in the state
            dispatch(storeOption(xopts, option));
        } else {
            console.error("xopts not available");
        }

        //mock create option
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 4000));

        setSerialisedOpt(encodeOptionData(option));
        console.log(serialisedOpt);
        setSubmitState(SubmitStates.Success);
    };

    const profitableUntil = () => Number(option.strikePrice) - Number(option.premium);
    const tillExpiry = usePrettyTimeTill(option.expiry, TimeGranularities.Minute);

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
                                    collateral={option.collateral}
                                    underlying={option.underlying}
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
                                        value={option.size}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        disabled
                                        name="underlying"
                                        value={option.underlying}
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
                                        value={option.strikePrice}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        name="collateral"
                                        value={option.collateral}
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
                                                checked={option.optionType === "european"}
                                                onChange={handleChange}
                                            >
                                                {t("create:type-european")}
                                            </ToggleButton>
                                            <ToggleButton
                                                type="radio"
                                                name="optionType"
                                                value="american"
                                                checked={option.optionType === "american"}
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
                                        selected={new Date(option.expiry)}
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
                                            value={option.premium}
                                            onChange={handleChange}
                                        ></FormControl>
                                        <InputGroup.Append>
                                            <InputGroup.Text>{option.collateral}</InputGroup.Text>
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
                                        value={option.sellerBTCAddress}
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
                                        value={option.offerExpiry}
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
                                        value={t("common:exchange-rate", {
                                            amount: profitableUntil(),
                                            underlying: option.underlying,
                                            collateral: option.collateral,
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
