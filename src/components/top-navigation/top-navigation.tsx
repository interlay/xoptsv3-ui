import React, { ReactElement } from "react";
import Link from "next/link";

export default function TopNavigation(): ReactElement {
    return (
        <div className="top-navigation container-fluid">
            <div className="price">
                <p>BTC/USD (placeholder)</p>
                <p>10504.04</p>
            </div>
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-10 logo-section">
                    <Link href="/">
                        <div>
                            <img
                                src="assets/xopts.png"
                                width="30"
                                height="30"
                                alt="company logo"
                                className="d-inline-block align-top img-fluid"
                            />
                            <div className="app-name">XOpts</div>
                        </div>
                    </Link>
                    <div className="nav-item">
                        <Link href="/create">Create Option</Link>
                    </div>
                    <div className="nav-item">
                        <Link href="/positions">Positions</Link>
                    </div>
                </div>
                <div className="menu col-xl-7 col-lg-7 col-md-6 col-sm-6 col-2">
                    <div>
                        <a
                            className="nav-item"
                            href="https://metamask.io/download.html"
                            target="__blank"
                        >
                            <div className="nav-button"> Get Metamask</div>
                        </a>
                        <Link href="/help">Help</Link>
                        <Link href="/developers">Developers</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
