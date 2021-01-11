import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import TopNavigation from "../components/top-navigation/top-navigation";
import { configureStore } from "../lib/store";
import { appWithTranslation } from "../common/i18n";
import "../stylesheets/app.scss";
import { useXOpts } from "../lib/hooks/use-xopts";

const store = configureStore();

function App({ Component, pageProps }: AppProps): ReactElement {
    // NOTE: pre-load even if not used in navigated page
    useXOpts();

    return (
        <Provider store={store}>
            <TopNavigation />
            <Container className="mt-3">
                <Component {...pageProps} />
            </Container>
        </Provider>
    );
}

export default appWithTranslation(App);
