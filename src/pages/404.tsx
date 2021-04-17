import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Layout } from '../layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: 20,
      marginTop: theme.spacing(2),
      textAlign: 'center',
    },
  }),
);

const NotFound: React.VFC = () => {
  const classes = useStyles();

  return (
    <Layout title='お探しのページは見つかりませんでした'>
      <Typography className={classes.text}>
        お探しのページは見つかりませんでした
      </Typography>
    </Layout>
  );
};

export default NotFound;
