import React, { useState } from 'react';
import loadable from '@loadable/component';
import { Box, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Website } from '../domain';
import { Loading } from '../components';
const TransitionPanel = loadable(() => import('../components/transitionPanel'));
const DailyPanel = loadable(() => import('../components/dailyPanel'));
const Layout = loadable(() => import('../layout'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  }),
);

const Home: React.VFC = () => {
  const classes = useStyles();

  const [selectedWebsite, setSelectedWebsite] = useState<Website>();
  const [currentTab, setCurrentTab] = useState<string>('daily');

  const handleChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setCurrentTab(value);
  };

  const handleChangeWebsite = (website?: Website) => {
    setSelectedWebsite(website);
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
        <DailyPanel fallback={<Loading/>} website={selectedWebsite} onChangeWebsite={handleChangeWebsite}/>
      </Box>

      <Box hidden={currentTab !== 'monthly'}>
        <TransitionPanel fallback={<Loading/>} website={selectedWebsite} onChangeWebsite={handleChangeWebsite}/>
      </Box>
    </Layout>
  );
};

export default Home;
