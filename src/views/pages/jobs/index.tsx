import React, { useState } from 'react';
import { CircularProgress, Box, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Language, Website } from '../../../domain';
import { Chart } from './chart';
import { LineChart } from './lineChart';
import { Websites } from './websites';
import { LanguagesTable } from './languagesTable';

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
    websitesContainer: {
      marginBottom: 15,
      textAlign: 'right',
    },
    tab: {
      width: '50%',
    },
  })
);

export const JobsPage: React.FC = () => {
  const classes = useStyles();

  // states
  const [website, setWebsite] = useState<'all' | Website>('all');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const jobsState = useSelector((state: RootState) => state.jobs);

  // events
  const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);
  const handleChangeTab = (_: any, val: number) => setTabIndex(val); // eslint-disable-line @typescript-eslint/no-explicit-any

  const websites: Website[] = jobsState.jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  const jobs = jobsState.jobs.filter(job => website === 'all' || job.website.name === website.name);
  const jobsOfThisYear = jobsState.jobsOfThisYear.filter(job => website === 'all' || job.website.name === website.name);

  const languages = (() => {
    const rows: { name: Language; count: number; searchUrl: string }[] = [];

    const m = new Map<Language, { count: number; searchUrl: string }>([]);
    jobs.forEach(job => {
      m.set(job.language, { count: (m.get(job.language)?.count || 0) + job.count, searchUrl: job.search_url });
    });

    m.forEach((url_count, name) => {
      rows.push({ name, count: url_count.count, searchUrl: url_count.searchUrl });
    });

    return rows;
  })();

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
            <Tab label='比較' className={classes.tab}/>
            <Tab label='推移' className={classes.tab}/>
          </Tabs>
        </Paper>
      </Box>

      {/* Bar */}
      <Box hidden={tabIndex !== 0} style={{ opacity: jobsState.fetched ? 1 : 0.5, pointerEvents: jobsState.fetched ? 'auto' : 'none' }} className={classes.chartContainer}>
        {jobsState.fetched ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <Box>
          <Chart jobs={jobs}/>
        </Box>

        <Box>
          <LanguagesTable languages={languages} website={website}/>
        </Box>
      </Box>

      {/* Line */}
      <Box hidden={tabIndex !== 1} style={{ opacity: jobsState.fetchedJobsOfThisYear ? 1 : 0.5, pointerEvents: jobsState.fetchedJobsOfThisYear ? 'auto' : 'none' }} className={classes.chartContainer}>
        {jobsState.fetchedJobsOfThisYear ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <LineChart jobs={jobsOfThisYear}/>
      </Box>
    </Box>
  );
};
