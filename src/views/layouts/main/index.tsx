import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { jobsActions } from '../../modules/jobsModule';
import { JobsControllerFactory } from '../../../interfaces/controllers/jobsControllerFactory';
import { Job } from '../../../domain/job';
import { JobsPage } from '../../pages/jobs';

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
  const setJobsOfThisYear = (jobs: Job[]) => dispatch(jobsActions.setJobsOfThisYear(jobs));

  useEffect(() => {
    (async () => {
      const controller = new JobsControllerFactory().create();
      const date = new Date();

      const jobs = (async () => {
        const jobs = await controller.getAt(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
        if (jobs.length > 0) return jobs;

        date.setDate(date.getUTCDate() - 1);
        return await controller.getAt(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
      })()

      const jobsOfThisYear = controller.getAt(date.getUTCFullYear());

      setJobs(await jobs);
      setJobsOfThisYear(await jobsOfThisYear);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container component='main' maxWidth='md' className={classes.root}>
      <Switch>
        <Route exact path='/' component={JobsPage}/>
        <Route       path='*' render={() => <Redirect to='/' />}/>
      </Switch>
    </Container>
  );
};
