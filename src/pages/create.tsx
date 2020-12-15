import React, { ReactElement } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../lib/types";
import { TFunction } from "next-i18next";
import ConnectButton from "../components/connect-button/connect-button";
import SpotPrice from "../components/spot-price/spot-price";
import { withTranslation } from "../common/i18n";
import { updateBTCSpotPriceAction } from "../lib/actions";
import { launchPriceUpdater } from "../common/utils";

const Create = ({ t }: { readonly t: TFunction }): ReactElement => {
    const isConnected = useSelector((state: AppState) => state.user.isConnected);
    const dispatch = useDispatch();
    dispatch(updateBTCSpotPriceAction(10530));

    launchPriceUpdater(dispatch);

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
                <Form>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:size")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="number" />
                        </Col>
                        <Col>
                            <Form.Control as="select" disabled>
                                <option>{t("BTC")}</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:strike")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="number" />
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option>USDT</option>
                                <option>DAI</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>{t("create:type")}</Form.Label>
                        </Col>
                        <Col>
                            <Form.Check inline label={t("create:type-american")} type={"radio"} />
                            <Form.Check inline label={t("create:type-european")} type={"radio"} />
                        </Col>
                    </Form.Group>
                    {isConnected ? <Button>Placeholder!</Button> : <ConnectButton />}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default withTranslation(["common", "create"])(Create);
