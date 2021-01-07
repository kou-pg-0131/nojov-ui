import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { JobsPage, PrivacyPolicyPage } from '../../pages';
import { GoogleAnalytics } from '../../../infrastructures';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 12,
    },
  })
);

export const Main: React.FC = () => {
  const classes = useStyles();

  const { listen } = useHistory();
  const location = useLocation();

  useEffect(() => {
    const ga = new GoogleAnalytics();

    listen(location => {
      ga.pageView(location.pathname);
    });
    ga.pageView(location.pathname);
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
