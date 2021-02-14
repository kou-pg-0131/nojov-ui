import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
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
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) jssStyles.remove();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Component {...pageProps}/>
    </ThemeProvider>
  );
};

export default App;
