import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { WebsitesProvider } from '../contexts';
import '../styles/global.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#15A2B8',
      dark: '#022F40',
    },
  },
});

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) jssStyles.remove();
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'prod') return;
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, { page_path: router.pathname });
  }, [router.pathname]);

  return (
    <WebsitesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps}/>
      </ThemeProvider>
    </WebsitesProvider>
  );
};

export default App;
