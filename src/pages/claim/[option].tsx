import { TFunction, withTranslation } from "next-i18next";
import React, { FormEvent, ReactElement, useMemo, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import ConnectButton from "../../components/connect-button/connect-button";
import SpotPrice from "../../components/spot-price/spot-price";
import ClaimOptionBtn from "../../components/claim-option-btn/claim-option-btn";
import { createDefault } from "../../lib/entities/option";
import { useSelector } from "react-redux";
import { AppState, SubmitStates } from "../../lib/types";
import { formatDatePretty } from "../../common/utils";
import { TimeGranularities, usePrettyTimeTill, useTestHook } from "../../lib/hooks/use-time-till";

const Claim = ({ t }: { readonly t: TFunction }): ReactElement => {
    const isConnected = useSelector((state: AppState) => state.user.isConnected);
    const { option } = useRouter().query;
    console.log(option);

    const [state, setState] = useState(createDefault());

    const [submitState, setSubmitState] = useState(SubmitStates.None);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState(SubmitStates.Processing);
        console.log(state);

        //mock create option
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 4000));
        setSubmitState(SubmitStates.Success);
    };

    const tillExpiry = usePrettyTimeTill(state.expiry, TimeGranularities.Minute);
    const tillValidity = usePrettyTimeTill(state.offerExpiry, TimeGranularities.Minute);
    const breakEven = useMemo(() => Number(state.strikePrice) - Number(state.premium), [
        state.strikePrice,
        state.premium,
    ]);
    const totalPrice = useMemo(() => Number(state.premium) * Number(state.size), [
        state.premium,
        state.size,
    ]);

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} sm={12} md={10} lg={8}>
                <Card className="my-5">
                    <Card.Header>
                        <Row>
                            <Col>
                                <Row as="h5">{t("claim-option")}</Row>
                                <Row>{t("claim-option-subtext")}</Row>
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
                                        type="text"
                                        name="size"
                                        readOnly
                                        plaintext
                                        value={t("size", {
                                            amount: state.size,
                                            underlying: t(state.underlying),
                                        })}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Label>{t("create:strike")}</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="strikePrice"
                                        readOnly
                                        plaintext
                                        value={t("strike", {
                                            amount: state.strikePrice,
                                            collateral: t(state.collateral),
                                        })}
                                    />
                                </Col>
                            </Form.Group>
                            <fieldset>
                                <Form.Group as={Row}>
                                    <Col xs={3}>
                                        <Form.Label>{t("create:type")}</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            name="type"
                                            readOnly
                                            plaintext
                                            value={t(`create:type-${state.optionType}`)}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Label>{t("create:expiry")}</Form.Label>
                                </Col>
                                <Col>
                                    <Row>
                                        <Form.Control
                                            type="text"
                                            name="expiry"
                                            readOnly
                                            plaintext
                                            value={formatDatePretty(state.expiry)}
                                        />
                                    </Row>
                                    <Row>
                                        <Form.Text>
                                            {t("common:time-until", { time: tillExpiry })}
                                        </Form.Text>
                                    </Row>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Label>{t("create:premium")}</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="premium"
                                        readOnly
                                        plaintext
                                        value={t("premium", {
                                            amount: state.premium,
                                            collateral: t(state.collateral),
                                        })}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Label>{t("seller-address")}</Form.Label>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col xs={1}>
                                            <Form.Label>{t(state.underlying)}</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="sellerBTCAddress"
                                                readOnly
                                                plaintext
                                                value={state.sellerBTCAddress}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={1}>
                                            <Form.Label>{t(state.collateral)}</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="sellerColAddress"
                                                readOnly
                                                plaintext
                                                value={state.sellerColAddress}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Label>{t("validity")}</Form.Label>
                                </Col>
                                <Col>
                                    <Row>
                                        <Form.Control
                                            type="text"
                                            name="expiry"
                                            readOnly
                                            plaintext
                                            value={formatDatePretty(state.offerExpiry)}
                                        />
                                    </Row>
                                    <Row>
                                        <Form.Text>
                                            {t("common:time-until", { time: tillValidity })}
                                        </Form.Text>
                                    </Row>
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row}>
                                <Col xs={3} className="align-self-center">
                                    <Form.Label>{t("break-even")}</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={t("common:exchange-rate", {
                                            amount: breakEven,
                                            underlying: state.underlying,
                                            collateral: state.collateral,
                                        })}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs={3} className="align-self-center">
                                    <Form.Label>{t("price")}</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control plaintext readOnly value={totalPrice} />
                                </Col>
                            </Form.Group>
                            {isConnected ? (
                                <ClaimOptionBtn submitState={submitState} />
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

export default withTranslation(["claim", "common"])(Claim);
