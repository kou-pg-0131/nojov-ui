import React from 'react';
import Link from 'next/link';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExternalLink } from '../components';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#333',
      boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
      bottom: 0,
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 110,
      left: 0,
      paddingTop: 12,
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    },
    linkList: {
      padding: 0,
      listStyle: 'none',
    },
    link: {
      color: '#fff',
      fontSize: 14,
    },
  })
);

export const Footer: React.VFC = () => {
  const classes = useStyles();

  return (
    <Box component='footer' className={classes.root}>
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
