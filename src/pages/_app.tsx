import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import TopNavigation from "../components/top-navigation/top-navigation";
import { configureStore } from "../lib/store";
import { appWithTranslation } from "../common/i18n";
import "../stylesheets/app.scss";

function App({ Component, pageProps }: AppProps): ReactElement {
    const store = configureStore();
    return (
        <Provider store={store}>
            <TopNavigation />
            <Container>
                <Component {...pageProps} />
            </Container>
        </Provider>
    );
}

export default appWithTranslation(App);
