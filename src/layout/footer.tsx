import React from 'react';
import Link from 'next/link';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExternalLink } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 110,
      left: 0,
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    },
    linkList: {
      marginBottom: 0,
    },
    link: {
      color: theme.palette.secondary.contrastText,
      fontSize: 14,
    },
  }),
);

export const Footer: React.VFC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} component='footer'>
      <Box>
        <ExternalLink className={classes.link} href='https://kou-pg.com'>
          &copy; 2020 koki sato
        </ExternalLink>
        <ul className={classes.linkList}>
          <li>
            <Link href='/privacy-policy'>
              <a className={classes.link}>プライバシーポリシー</a>
            </Link>
          </li>
          <li>
            <ExternalLink className={classes.link} href='https://github.com/kou-pg-0131/nojov-ui'>View on GitHub</ExternalLink>
          </li>
        </ul>
      </Box>
    </Box>
  );
};
