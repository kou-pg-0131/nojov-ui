import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 68,
    },
    logoLink: {
      textDecoration: 'none',
    },
    logoText: {
      color: '#fff',
      fontFamily: 'Cherry Swash',
      fontSize: '36px',
    },
  }),
);

export const Header: React.VFC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Link href='/'>
          <a className={classes.logoLink}>
            <Typography variant='h1' className={classes.logoText}>Nojov</Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
