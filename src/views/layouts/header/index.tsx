import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

export const Header: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>
          Nojov
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
