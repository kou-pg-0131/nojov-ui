import React from 'react';

// material-ui
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// react-router
import { Link } from 'react-router-dom';

// styles
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

// component
export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        {/* logo */}
        <Link to='/' className={classes.logoLink}>
          <Typography variant='h1' className={classes.logoText}>Nojov</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
