import type {AppProps} from 'next/app'
import Head from 'next/head';
import '../styles/globals.scss';
import React from "react";
import {wrapper} from "../redux/store";

const MyApp: React.FunctionComponent<AppProps> = ({Component, pageProps}) => {

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            <title>Chat</title>
        </Head>
        <Component {...pageProps} />
    </>
}


export default wrapper.withRedux(MyApp)
