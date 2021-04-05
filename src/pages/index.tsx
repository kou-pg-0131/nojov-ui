import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { format } from 'date-fns';
import { useWebsites } from '../contexts';
import { Layout } from '../layout';
import { Loading, JobsTable, JobsBarChart, Checkbox, WebsitesSelect } from '../components';
import { Job, Website } from '../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginBottom: theme.spacing(3),
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState<string>('daily');
  const [sort, setSort] = useState<boolean>(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website>();
  const { websites, updatedAt } = useWebsites();

  const jobs: Job[] = (() => {
    if (selectedWebsite) {
      return selectedWebsite.jobs;
    }

    return websites?.reduce((result, current) => {
      return [...result, ...current.jobs];
    }, []);
  })();

  const handleChangeWebsite = (website?: Website): void => {
    setSelectedWebsite(website);
  };

  const handleChangeSort = (checked: boolean) => {
    setSort(checked);
  };

  const handleChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setCurrentTab(value);
  };

  return (
    <Layout>
      {!websites && <Loading/>}
      {websites && jobs && (
        <>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <WebsitesSelect selected={selectedWebsite} onChange={handleChangeWebsite} websites={websites}/>
            <Checkbox
              label='求人数の多い順に並び替え'
              labelPlacement='start'
              checked={sort}
              onChange={handleChangeSort}
            />
            <small>
              最終更新日時: {updatedAt && <time dateTime={updatedAt.toISOString()}>{format(updatedAt, 'yyyy/MM/dd HH:mm')}</time>}
            </small>
          </Box>

          <Paper>
            <Tabs
              className={classes.tabs}
              value={currentTab}
              variant='fullWidth'
              indicatorColor='primary'
              textColor='primary'
              onChange={handleChangeTab}
            >
              <Tab label='今日' value='daily'/>
              <Tab label='月間' value='monthly'/>
            </Tabs>
          </Paper>

          <Box hidden={currentTab !== 'daily'}>
            <JobsBarChart
              jobs={jobs}
              sort={sort}
            />

            <JobsTable
              website={selectedWebsite}
              jobs={jobs}
            />
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Home;
