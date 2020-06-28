import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore } from '../../modules/store';
import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      paddingBottom: 60,
    },
  })
);

const store = createStore();

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Box className={classes.root}>
        <CssBaseline/>
        <Header/>
        <Main/>
        <Footer/>
      </Box>
    </Provider>
  );
};
