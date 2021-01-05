import React, { useState } from 'react';

// material-ui
import { CircularProgress, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

// components
import { Chart } from './chart';
import { WebsitesSelect } from './websitesSelect';
import { LanguagesTable } from './languagesTable';

// other
import { Language, Website } from '../../../domain';

// styles
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

// component
export const JobsPage: React.FC = () => {
  const classes = useStyles();

  // states
  const [website, setWebsite] = useState<'all' | Website>('all');
  const jobsState = useSelector((state: RootState) => state.jobs);

  // events
  const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);

  const websites: Website[] = jobsState.jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  const jobs = jobsState.jobs.filter(job => website === 'all' || job.website.name === website.name);

  const languages = (() => {
    const m = new Map<Language, { count: number; searchUrl: string }>([]);
    jobs.forEach(job => {
      m.set(job.language, { count: (m.get(job.language)?.count || 0) + job.count, searchUrl: job.search_url });
    });

    return Array.from(m.entries()).map(([name, job]) => ({ name, count: job.count, searchUrl: job.searchUrl }));
  })();

  // render
  return (
    <Box>
      <Box className={classes.websitesContainer}>
        <WebsitesSelect onChange={handleChangeWebsite} websites={websites}/>
      </Box>

      {/* Bar */}
      <Box style={{ opacity: jobsState.fetched ? 1 : 0.5, pointerEvents: jobsState.fetched ? 'auto' : 'none' }} className={classes.chartContainer}>
        {jobsState.fetched ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <Box>
          <Chart jobs={jobs}/>
        </Box>

        {!jobsState.fetched ? null : (
          <Box>
            <LanguagesTable languages={languages} website={website}/>
          </Box>
        )}
      </Box>
    </Box>
  );
};
