import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 12,
    },
  })
);

export const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='md' className={classes.root}>
      main component.
    </Container>
  );
};
