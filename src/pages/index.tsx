import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Layout } from '../layout';
import { DailyPanel, TransitionPanel } from '../components';

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
        <TransitionPanel/>
      </Box>
    </Layout>
  );
};

export default Home;
