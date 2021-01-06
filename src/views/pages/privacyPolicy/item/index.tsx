import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 20,
    },
    title: {
      borderBottom: '1px solid #333',
      fontSize: 28,
      marginBottom: 8,
    },
    text: {
      wordBreak: 'break-all',
    },
  })
);

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Item: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant='h3' className={classes.title}>{props.title}</Typography>
      <Typography className={classes.text}>{props.children}</Typography>
    </Box>
  );
};
