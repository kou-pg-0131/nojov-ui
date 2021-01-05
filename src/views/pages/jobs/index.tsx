import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Chart } from './chart';
import { WebsitesSelect } from './websitesSelect';
import { LanguagesTable } from './languagesTable';
import { Job, Language, Website } from '../../../domain';
import { NojovAPIClientFactory } from '../../../infrastructures';

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

  const [website, setWebsite] = useState<'all' | Website>('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);

  const websites: Website[] = jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  const languages = (() => {
    const m = new Map<Language, { count: number; searchUrl: string }>([]);
    jobs.filter(job => website === 'all' || job.website.name === website.name).forEach(job => {
      m.set(job.language, { count: (m.get(job.language)?.count || 0) + job.count, searchUrl: job.search_url });
    });

    return Array.from(m.entries()).map(([name, job]) => ({ name, count: job.count, searchUrl: job.searchUrl }));
  })();

  useEffect(() => {
    new NojovAPIClientFactory().create().getLatest().then(res => {
      setJobs(res.today);
      setFetched(true);
    });
  }, []);

  return (
    <Box>
      <Box className={classes.websitesContainer}>
        <WebsitesSelect onChange={handleChangeWebsite} websites={websites}/>
      </Box>

      <Box style={{ opacity: fetched ? 1 : 0.5, pointerEvents: fetched ? 'auto' : 'none' }} className={classes.chartContainer}>
        {fetched ? null : <Box className={classes.circleContainer}><CircularProgress/></Box>}
        <Box>
          <Chart jobs={jobs}/>
        </Box>

        {!fetched ? null : (
          <Box>
            <LanguagesTable languages={languages} website={website}/>
          </Box>
        )}
      </Box>
    </Box>
  );
};
