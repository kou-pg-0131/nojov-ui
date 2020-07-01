import React, { useState } from 'react';
import { CircularProgress, Box, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Chart } from './chart';
import { LineChart } from './lineChart';
import { Sort } from './sort';
import { Websites } from './websites';
import { Website } from '../../../domain/website';
import { Language } from '../../../domain/language';

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
  const [tabIndex, setTabIndex] = useState<number>(0);
  const jobsState = useSelector((state: RootState) => state.jobs);

  // events
  const handleChangeSort = (checked: boolean): void => setSort(checked);
  const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);
  const handleChangeTab = (_: any, val: number) => setTabIndex(val);

  const websites: Website[] = jobsState.jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  const jobs = jobsState.jobs.filter(job => website === 'all' || job.website.name === website.name);
  const jobsOfThisYear = jobsState.jobsOfThisYear.filter(job => website === 'all' || job.website.name === website.name);

  // render
  return (
    <Box>
      <Box className={classes.websitesContainer}>
        <Websites onChange={handleChangeWebsite} websites={websites}/>
      </Box>

      <Box>
        <Paper>
          <Tabs
            centered
            value={tabIndex}
            onChange={handleChangeTab}
          >
            <Tab label='比較'/>
            <Tab label='推移'/>
          </Tabs>
        </Paper>
      </Box>

      {/* Bar */}
      <Box hidden={tabIndex !== 0} style={{ opacity: jobsState.fetched ? 1 : 0.5, pointerEvents: jobsState.fetched ? 'auto' : 'none' }} className={classes.chartContainer}>
        {jobsState.fetched ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <Box className={classes.sortContainer}>
          <Sort onChange={handleChangeSort}/>
        </Box>
        <Chart sort={sort} jobs={jobs}/>
      </Box>

      {/* Line */}
      <Box hidden={tabIndex !== 1} style={{ opacity: jobsState.fetchedJobsOfThisYear ? 1 : 0.5, pointerEvents: jobsState.fetchedJobsOfThisYear ? 'auto' : 'none' }} className={classes.chartContainer}>
        {jobsState.fetchedJobsOfThisYear ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <LineChart jobs={jobsOfThisYear}/>
      </Box>
    </Box>
  );
};
