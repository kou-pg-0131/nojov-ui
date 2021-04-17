import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(0.5),
    },
    logoText: {
      color: theme.palette.primary.contrastText,
      fontFamily: 'Cherry Swash',
      fontSize: 36,
    },
  }),
);

export const Header: React.VFC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position='static'>
      <Toolbar>
        <Link href='/'>
          <a>
            <Typography className={classes.logoText} variant='h1'>Nojov</Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
