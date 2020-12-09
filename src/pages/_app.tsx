import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { ReactElement } from "react";
import TopNavigation from "../components/top-navigation/top-navigation";

function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            <TopNavigation />
            <Component {...pageProps} />
        </>
    );
}

export default App;
