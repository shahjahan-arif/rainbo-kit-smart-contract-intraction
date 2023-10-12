import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,

} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  

  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    goerli,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  [publicProvider()],

);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '15e04da4b97b3e9da4181cedcf302d1f',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
