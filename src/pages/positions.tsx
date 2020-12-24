import { withTranslation } from "next-i18next";
import React, { ReactElement, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
            <td>{new Date(option.expiry).toLocaleDateString()}</td>
            <td>{option.strikePrice.toLocaleString()}</td>
            <td>{position.writtenAmount.toLocaleString()}</td>
            <td>{position.boughtAmount.toLocaleString()}</td>
            <td>{(position.writtenAmount - position.boughtAmount).toLocaleString()}</td>
        </tr>
    );
}

function Positions(): ReactElement {
    const xopts = useXOpts();
    const dispatch = useDispatch();
    const positions = useSelector((state: AppState) => state.positions);
    const userAddress = useSelector((state: AppState) => state.user.account);

    useEffect(() => {
        if (xopts && userAddress) dispatch(fetchPositions(xopts));
    }, [xopts, userAddress]);

    return (
        <>
            <h1>Current Positions</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Expiry date</th>
                        <th>Strike price</th>
                        <th>Written amount</th>
                        <th>Bought amount</th>
                        <th>Balance</th>
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
