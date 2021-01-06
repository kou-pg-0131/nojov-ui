import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
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
