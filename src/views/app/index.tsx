import React from 'react';
import ReactGA from 'react-ga';
import { CssBaseline, Box } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Header, Main, Footer } from '../layouts';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#15A2B8',
      dark: '#022F40',
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      paddingBottom: 80,
      position: 'relative',
    },
  })
);

ReactGA.initialize(process.env.REACT_APP_GA_ID, {
  debug: process.env.REACT_APP_STAGE !== 'prod',
});
const history = createBrowserHistory();
history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box className={classes.root}>
        <Router history={history}>
          <Header/>
          <Main/>
          <Footer/>
        </Router>
      </Box>
    </ThemeProvider>
  );
};
