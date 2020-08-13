import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { jobsActions } from '../../modules';
import { JobsControllerFactory } from '../../../interfaces/controllers';
import { Job } from '../../../domain';
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

  const dispatch = useDispatch();
  const setJobs = (jobs: Job[]) => dispatch(jobsActions.setJobs(jobs));

  useEffect(() => {
    (async () => {
      const controller = new JobsControllerFactory().create();
      const res        = await controller.getLatest();

      setJobs(res.latest);
    })();
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
