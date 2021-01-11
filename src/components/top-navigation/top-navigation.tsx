import React, { ReactElement } from "react";
import Link from "next/link";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useEthers } from "../../lib/hooks";

function AccountDropdown(): ReactElement {
    return (
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
    );
}

function LoginButton(): ReactElement {
    const handleLogin = () => {
        console.log("TODO: handle login");
    };
    return <Nav.Link onClick={handleLogin}>Login</Nav.Link>;
}

function GetMetamask(): ReactElement {
    return (
        <Nav className="mr-sm-2">
            <a className="nav-item" href="https://metamask.io/download.html" target="__blank">
                <div className="nav-button"> Get Metamask</div>
            </a>
        </Nav>
    );
}

export default function TopNavigation(): ReactElement {
    const account = false;
    const hasMetaMask = true;

    const provider = useEthers();

    return (
        <Navbar bg="light">
            <Navbar.Brand href="/">
                <img
                    src="assets/xopts.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                XOpts
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Link href="/" passHref>
                    <Nav.Link>Home</Nav.Link>
                </Link>
                <Link href="/create" passHref>
                    <Nav.Link>Create Option</Nav.Link>
                </Link>
                <Link href="/positions" passHref>
                    <Nav.Link>Positions</Nav.Link>
                </Link>
                <Link href="/help" passHref>
                    <Nav.Link>Help</Nav.Link>
                </Link>
                <Link href="/developers" passHref>
                    <Nav.Link>Developers</Nav.Link>
                </Link>
            </Nav>
            {account ? <AccountDropdown /> : provider ? <LoginButton /> : <GetMetamask />}
        </Navbar>
    );
}
