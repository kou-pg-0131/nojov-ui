import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Header, Main, Footer } from '../views/layouts';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      paddingBottom: 80,
      position: 'relative',
    },
  })
);

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header/>
      <Main>
        {props.children}
      </Main>
      <Footer/>
    </Box>
  );
};
