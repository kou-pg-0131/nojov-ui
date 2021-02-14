import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LanguagesTable, LanguagesTableRecord, WebsitesSelect, JobsBarChart } from '../views/components';
import { Job, Language, Website } from '../domain';
import { NojovAPIClientFactory } from '../infrastructures';

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

const Home: React.FC = () => {
  const classes = useStyles();

  const [updatedAt, setUpdatedAt] = useState<string>();
  const [website, setWebsite] = useState<'all' | Website>('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);

  const websites: Website[] = jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  const filteredJobs: Job[] = (() => {
    return website === 'all' ? jobs : jobs.filter(job => job.website.name === website.name);
  })();

  const languageRecords: { name: Language; count: number; searchUrl?: string }[] = (() => {
    if (website !== 'all') {
      return filteredJobs.map(job =>
        ({ name: job.language, count: job.count, searchUrl: job.search_url })
      );
    }

    const m = new Map<Language, number>([]);
    filteredJobs.forEach(job => {
      m.set(job.language, (m.get(job.language) || 0) + job.count);
    });
    return Array.from(m.entries()).map(([name, count]) => ({ name, count }));
  })();

  useEffect(() => {
    new NojovAPIClientFactory().create().getLatest().then(res => {
      setUpdatedAt(res.updated_at);
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
        {!fetched && <Box className={classes.circleContainer}><CircularProgress/></Box>}

        <Box>
          <JobsBarChart jobs={filteredJobs} updatedAt={updatedAt}/>
        </Box>

        <Box>
          <LanguagesTable>
            {languageRecords.sort((a, b) => b.count - a.count).map((record, i) => (
              <LanguagesTableRecord
                key={i}
                index={i}
                name={record.name}
                count={record.count}
                searchUrl={record.searchUrl}
                website={website}
              />
            ))}
          </LanguagesTable>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
