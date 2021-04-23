import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(10),
    },
  }),
);

export const Loading: React.VFC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress/>
    </Box>
  );
};
