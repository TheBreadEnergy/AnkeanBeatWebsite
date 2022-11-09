import React from 'react';
import './scss/main.scss';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import  * as ReactDOMClient from 'react-dom/client';
import store from "./redux/Store";
import AuthLayout from "./hocs/Auth-Layout";
import ScrollToTop from "./hocs/ScrollToTop";


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
        <BrowserRouter>
            <Provider store={store}>
                    <AuthLayout>
                        <ScrollToTop>
                            <App/>
                        </ScrollToTop>
                    </AuthLayout>
            </Provider>
        </BrowserRouter>
);

