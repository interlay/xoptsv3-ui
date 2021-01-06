import { TFunction, withTranslation } from "next-i18next";
import React, { FormEvent, ReactElement, useMemo, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { utils } from "ethers";
import ConnectButton from "../../components/connect-button/connect-button";
import SpotPrice from "../../components/spot-price/spot-price";
import ClaimOptionBtn from "../../components/claim-option-btn/claim-option-btn";
import { createDefault } from "../../../xopts-lib/models/option";
import { useSelector } from "react-redux";
import { AppState, SubmitStates } from "../../lib/types";
import { formatDatePretty } from "../../common/utils";
import { TimeGranularities, usePrettyTimeTill } from "../../lib/hooks/use-time-till";
import { useXOpts } from "../../lib/hooks/use-xopts";

const Claim = ({ t }: { readonly t: TFunction }): ReactElement => {
    const isConnected = useSelector((state: AppState) => state.user.isConnected);
    const xopts = useXOpts();
    let { option } = useRouter().query;
    option = !option ? "" : Array.isArray(option) ? option[0] : option;
    const optionId = utils.isBytesLike(option) ? option : "";

    const [wasFound, setWasFound] = useState(optionId !== "");
    const [state, setState] = useState(createDefault());

    (async () => {
        if (!wasFound) return console.log("No valid option ID.");
        if (!xopts) return console.error("XOpts not available");

        if (state.id !== optionId) {
            const option = await xopts.loadOption(optionId);
            if (option.id === "0x" + "0".repeat(64)) {
                // no such option
                setWasFound(false);
            } else {
                setState(option);
            }
        }
    })();

    const [submitState, setSubmitState] = useState(SubmitStates.None);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState(SubmitStates.Processing);

        if (xopts) {
            await xopts.executeOption(state.id);
            setSubmitState(SubmitStates.Success);
        } else {
            console.error("XOpts not available");
            setSubmitState(SubmitStates.Failure);
        }
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

    if (!wasFound) {
        return (
            <Card>
                <Card.Header>Option not found</Card.Header>
                <Card.Body>No option offer exists with this ID.</Card.Body>
            </Card>
        );
    }

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
                                    <Form.Control
                                        type="text"
                                        name="expiry"
                                        readOnly
                                        plaintext
                                        value={formatDatePretty(state.expiry)}
                                    />
                                    <Form.Text>
                                        {t("common:time-until", { time: tillExpiry })}
                                    </Form.Text>
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
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="sellerBTCAddress"
                                                readOnly
                                                plaintext
                                                value={t("currency-n-address", {
                                                    currency: t(state.underlying),
                                                    address: state.sellerBTCAddress,
                                                })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="sellerColAddress"
                                                readOnly
                                                plaintext
                                                value={t("currency-n-address", {
                                                    currency: t(state.collateral),
                                                    address: state.sellerColAddress,
                                                })}
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
                                    <Form.Control
                                        type="text"
                                        name="expiry"
                                        readOnly
                                        plaintext
                                        value={formatDatePretty(state.offerExpiry)}
                                    />
                                    <Form.Text>
                                        {t("common:time-until", { time: tillValidity })}
                                    </Form.Text>
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
