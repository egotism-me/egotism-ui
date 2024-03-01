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
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

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
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00dd00',
      contrastText: '#000000'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Increase for more rounded corners
          textTransform: 'none', // Disable all caps
          fontWeight: 700
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: 'right'
        }
      }
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Egotism</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider 
          chains={chains}
          theme={darkTheme({accentColor: theme.palette.primary.main})}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Analytics />
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
