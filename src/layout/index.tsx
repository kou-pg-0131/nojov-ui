import React from 'react';
import Head from 'next/head';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Header } from './header';
import { Footer } from './footer';
import { Main } from './main';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      paddingBottom: 80,
      position: 'relative',
    },
  })
);

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const baseTitle = 'Nojov - プログラミング言語別求人数ビューア';
  const title = props.title ? `${props.title} | ${baseTitle}` : baseTitle;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box className={classes.root}>
        <Header/>
        <Main>
          {props.children}
        </Main>
        <Footer/>
      </Box>
    </>
  );
};
