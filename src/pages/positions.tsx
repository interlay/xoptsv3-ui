import { withTranslation } from "next-i18next";
import React, { ReactElement, useEffect } from "react";
import { Card, Col, Row, Button, Form, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ConnectButton from "../components/connect-button/connect-button";
import SpotPrice from "../components/spot-price/spot-price";
import CopyButton from "../components/copy-button/copy-button";
import { Position } from "../../xopts-lib";
import { fetchPositions } from "../lib/actions/position.actions";
import { useXOpts } from "../lib/hooks/use-xopts";
import { AppState } from "../lib/types";
import { getOptionLink } from "../common/utils";

type PositionRowProps = {
    key: number;
    position: Position;
    price: number;
};

function PositionRow(props: PositionRowProps): ReactElement {
    const { position, price } = props;
    const { option } = position;
    const counterparty = position.written ? (
        position.buyerColAddress === "0x" + "0".repeat(40) ? (
            <td>
                Not yet executed. Share:
                <InputGroup>
                    <Form.Control type="text" readOnly value={getOptionLink(option.id)} />
                    <InputGroup.Append>
                        <CopyButton linkString={getOptionLink(option.id)} />
                    </InputGroup.Append>
                </InputGroup>
            </td>
        ) : (
            <td>position.buyerColAddress</td>
        )
    ) : (
        <td>option.sellerColAddress</td>
    );

    const performance = (() => {
        const writer =
            Number(option.premium) +
            (option.put ? price - Number(option.strikePrice) : Number(option.strikePrice) - price);
        return position.written ? writer : -writer;
    })();

    return (
        <tr key={props.key}>
            <td>{position.written ? "Sell" : "Buy"}</td>
            <td>{option.put ? "Put" : "Call"}</td>
            <td>{option.optionType == "european" ? "European" : "American"}</td>
            {counterparty}
            <td>{option.strikePrice.toLocaleString() + " " + option.collateral}</td>
            <td>{option.size}</td>
            <td>{performance}</td>
            <td>{new Date(option.expiry).toLocaleDateString()}</td>
            <td>
                <Button>Temp!</Button>
            </td>
        </tr>
    );
}

function Positions(): ReactElement {
    const xopts = useXOpts();
    const dispatch = useDispatch();
    const isConnected = useSelector((state: AppState) => state.user.isConnected);
    const positions = useSelector((state: AppState) => state.positions);
    const userAddress = useSelector((state: AppState) => state.user.account);
    const price = useSelector((state: AppState) => state.prices.price);

    useEffect(() => {
        if (xopts && userAddress) dispatch(fetchPositions(xopts));
    }, [xopts, userAddress]);

    if (!isConnected) return <ConnectButton />;
    return (
        <Row className="justify-content-md-center">
            <Col xs={12} sm={12} md={10} lg={8}>
                <Card className="my-5">
                    <Card.Header>
                        <Row>
                            <Col>
                                <Row as="h5">Current Positions</Row>
                            </Col>
                            <Col>
                                <SpotPrice collateral={"DAI"} underlying={"BTC"} />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive="lg">
                            <thead>
                                <tr>
                                    <th>Side</th>
                                    <th>Call/Put</th>
                                    <th>Type</th>
                                    <th>Counterparty</th>
                                    <th>Strike</th>
                                    <th>Size</th>
                                    <th>Performance</th>
                                    <th>Expiry</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {positions &&
                                    positions.map((position, key) => {
                                        return PositionRow({ position, key, price });
                                    })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default withTranslation<"common">("common")(Positions);
