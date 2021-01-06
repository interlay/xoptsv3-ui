import { withTranslation } from "next-i18next";
import React, { ReactElement, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ConnectButton from "../components/connect-button/connect-button";
import { Position } from "../../xopts-lib";
import { fetchPositions } from "../lib/actions/position.actions";
import { useXOpts } from "../lib/hooks/use-xopts";
import { AppState } from "../lib/types";

type PositionRowProps = {
    key: number;
    position: Position;
};

function PositionRow(props: PositionRowProps): ReactElement {
    const { position } = props;
    const { option } = position;
    return (
        <tr key={props.key}>
            <td>{position.written ? "Sell" : "Buy"}</td>
            <td>{position.written ? position.buyerColAddress : option.sellerColAddress}</td>
            <td>{option.strikePrice.toLocaleString()}</td>
            <td>{option.size}</td>
            <td>Performance placeholder</td>
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

    useEffect(() => {
        if (xopts && userAddress) dispatch(fetchPositions(xopts));
    }, [xopts, userAddress]);

    if (!isConnected) return <ConnectButton />;
    return (
        <>
            <h1>Current Positions</h1>
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
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
                            return PositionRow({ position, key });
                        })}
                </tbody>
            </Table>
        </>
    );
}

export default withTranslation<"common">("common")(Positions);
