import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
    },
    title: {
      borderBottom: '1px solid #333',
      fontSize: 28,
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(1),
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

export const PrivacyPolicyItem: React.VFC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant='h3' className={classes.title}>{props.title}</Typography>
      <Box className={classes.text}>{props.children}</Box>
    </Box>
  );
};
