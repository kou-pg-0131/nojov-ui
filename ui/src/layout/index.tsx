import React from 'react';
import Head from 'next/head';
import { Box, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Header } from './header';
import { Footer } from './footer';
import { Main } from './main';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
        },
        ul: {
          padding: 0,
          listStyle: 'none',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#15A2B8',
      dark: '#022F40',
    },
    secondary: {
      main: '#333333',
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      minHeight: '100vh',
      paddingBottom: 120,
      position: 'relative',
    },
  }),
);

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const Layout: React.VFC<Props> = (props: Props) => {
  const classes = useStyles();

  const baseTitle = 'Nojov - プログラミング言語別求人数ビューア';
  const title = props.title ? `${props.title} | ${baseTitle}` : baseTitle;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Head>
        <title>{title}</title>
      </Head>

      <Box className={classes.wrapper}>
        <Header/>
        <Main>
          {props.children}
        </Main>
        <Footer/>
      </Box>
    </ThemeProvider>
  );
};
