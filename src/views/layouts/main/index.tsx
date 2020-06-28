import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { jobsActions } from '../../modules/jobsModule';
import { JobsControllerFactory } from '../../../interfaces/controllers/jobsControllerFactory';
import { Job } from '../../../domain/job';

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
  const jobsState = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    (async () => {
      const controller = new JobsControllerFactory().create();
      const jobs = await controller.getAt(2020)
      console.log(jobs);
      setJobs(jobs);
    })();
  }, []);

  return (
    <Container component='main' maxWidth='md' className={classes.root}>
      <button onClick={() => { console.log(jobsState.jobs); }}>hoge</button>
      main component.
    </Container>
  );
};
