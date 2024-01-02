import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygon,
  localhost
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// for some stupid fucking reason anvil chain-id is 31337 and 
// 
const patchedLocalhost = JSON.parse(JSON.stringify(localhost));

patchedLocalhost.id = 31337;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,
    patchedLocalhost,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Egotism',
  projectId: 'EGOTISM',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6663',
    },
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains}
        theme={darkTheme({accentColor: theme.palette.primary.main})}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
