import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import GithubTriangle from "../components/GithubTriangle";
import Head from "next/head";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import "../styles/Button.css";
import "../styles/Header.css";
import "../styles/Footer.css";


// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider desiredChainId={activeChainId}>
            <Head>
                <title>HOUSE OF ANASAH</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               
                <meta
                    name="description"
                    content="HOUSE OF ANASAH NFT MINT"
                />
            </Head>
            <Component {...pageProps} />
            <GithubTriangle />
        </ThirdwebProvider>
    );
}

export default MyApp;