import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#0D1321',
      boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
      bottom: 0,
      color: '#fff',
      height: 60,
      left: 0,
      padding: 8,
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    },
  })
);

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component='footer' className={classes.root}>
      <Typography component='small'>
        &copy; 2020 koki sato
      </Typography>
    </Box>
  );
};
