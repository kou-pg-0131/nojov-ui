import React, { useState } from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Chart } from './chart';
import { Sort } from './sort';
import { Websites } from './websites';
import { Website } from '../../../domain/website';

const useStyles = makeStyles(() =>
  createStyles({
    chartContainer: {
      position: 'relative',
    },
    circleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
    },
    sortContainer: {
      textAlign: 'right',
    },
    websitesContainer: {
      marginBottom: 15,
      textAlign: 'right',
    },
  })
);

export const JobsPage: React.FC = () => {
  const classes = useStyles();

  // states
  const [website, setWebsite] = useState<'all' | Website>('all');
  const [sort, setSort] = useState<boolean>(false);
  const jobsState = useSelector((state: RootState) => state.jobs);

  // events
  const handleChangeSort = (checked: boolean): void => setSort(checked);
  const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);

  const websites: Website[] = jobsState.jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  // render
  return (
    <Box>
      <Box style={{ opacity: jobsState.fetched ? 1 : 0.5, pointerEvents: jobsState.fetched ? 'auto' : 'none' }} className={classes.chartContainer}>
        {jobsState.fetched ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <Box className={classes.websitesContainer}>
          <Websites onChange={handleChangeWebsite} websites={websites}/>
        </Box>
        <Box className={classes.sortContainer}>
          <Sort onChange={handleChangeSort}/>
        </Box>
        <Chart sort={sort} jobs={jobsState.jobs} website={website}/>
      </Box>
    </Box>
  );
};
