import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { ThemeProvider, createStyles, makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore } from '../../modules';
import { Header, Main, Footer } from '..';
import { customTheme } from './customTheme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      paddingBottom: 80,
      position: 'relative',
    },
  })
);

const store = createStore();
const history = createBrowserHistory();

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline/>
        <Box className={classes.root}>
          <Router history={history}>
            <Header/>
            <Main/>
            <Footer/>
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};
