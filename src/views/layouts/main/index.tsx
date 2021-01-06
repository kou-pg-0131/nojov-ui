import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { JobsPage, PrivacyPolicyPage } from '../../pages';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 12,
    },
  })
);

export const Main: React.FC = () => {
  const classes = useStyles();

  const location = useLocation();

  useEffect(() => {
    window.gtag('config', process.env.REACT_APP_GA_ID, { page_path: location.pathname, debug_mode: process.env.REACT_APP_STAGE !== 'prod' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container component='main' maxWidth='md' className={classes.root}>
      <Switch>
        <Route exact path='/'              component={JobsPage}/>
        <Route exact path='/privacy-policy' component={PrivacyPolicyPage}/>
        <Route       path='*'              render={() => <Redirect to='/' />}/>
      </Switch>
    </Container>
  );
};
