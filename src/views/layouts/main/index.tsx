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

type Props = {
  children: React.ReactNode;
};

export const Main: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='md' className={classes.root}>
      {props.children}
    </Container>
  );
};
