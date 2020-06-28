import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CssBaseline/>
      <Header/>
      <Main/>
      <Footer/>
    </Box>
  );
};
