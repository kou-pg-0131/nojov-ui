import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      fontFamily: 'Cherry Swash',
      fontSize: '36px',
    },
  })
);

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography className={classes.logo}>
          Nojov
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
