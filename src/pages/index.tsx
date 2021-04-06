import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { Layout } from '../layout';
import { DailyPanel, Loading, JobsLineChart } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState<string>('daily');
  const { websitesPerYear } = useWebsites();

  const handleChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setCurrentTab(value);
  };

  return (
    <Layout>
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
          <Tab label='推移' value='monthly'/>
        </Tabs>
      </Paper>

      <Box hidden={currentTab !== 'daily'}>
        <DailyPanel/>
      </Box>

      <Box hidden={currentTab !== 'monthly'}>
        {!websitesPerYear && <Loading/>}
        {websitesPerYear && (
          <>
            <JobsLineChart websitesWithUpdatedAt={websitesPerYear}/>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
