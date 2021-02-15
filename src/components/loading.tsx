import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      margin: theme.spacing(4),
    },
  }),
);

export const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress/>
    </Box>
  );
};
