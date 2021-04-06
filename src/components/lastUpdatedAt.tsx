import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontSize: 12,
    },
  }),
);

type Props = {
  updatedAt: Date;
};

export const LastUpdatedAt: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      最終更新日時: <time dateTime={props.updatedAt.toISOString()}>{format(props.updatedAt, 'yyyy/MM/dd HH:mm')}</time>
    </Typography>
  );
};
