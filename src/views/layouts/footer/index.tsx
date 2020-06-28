import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      bottom: 0,
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
