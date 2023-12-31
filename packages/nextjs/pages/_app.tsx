import { useEffect } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import Script from 'next/script'


const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {


  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", "scaffoldEthDark");
  });

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
          <div className="flex flex-col min-h-screen">
            <main className="relative flex flex-col flex-1">
              <Component {...pageProps} />
            </main>
          </div>
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>
      <Script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom-container@0.5.0"></Script>
    </>
  );
};

export default ScaffoldEthApp;
