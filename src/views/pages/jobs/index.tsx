import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Chart } from './chart';

export const JobsPage: React.FC = () => {
  const jobsState = useSelector((state: RootState) => state.jobs);

  return (
    <Box>
      <Chart jobs={jobsState.jobs} fetched={jobsState.fetched}/>
    </Box>
  );
};
