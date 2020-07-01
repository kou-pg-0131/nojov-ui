import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore } from '../../modules/store';
import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      paddingBottom: 60,
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
      <CssBaseline/>
      <Box className={classes.root}>
        <Router history={history}>
          <Header/>
          <Main/>
          <Footer/>
        </Router>
      </Box>
    </Provider>
  );
};
