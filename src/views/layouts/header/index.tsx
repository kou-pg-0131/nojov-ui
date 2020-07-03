import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
  })
);

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Link to='/' className={classes.logoLink}>
          <Typography className={classes.logoText}>
            Nojov
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
