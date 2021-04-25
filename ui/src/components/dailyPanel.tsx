import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { LastUpdatedAt, Loading, JobsTable, JobsBarChartWithRecharts as JobsBarChart, Checkbox, WebsitesSelect } from '../components';
import { Job, Website } from '../domain';

type Props = {
  website?: Website;
  onChangeWebsite: (website?: Website) => void;
};

const DailyPanel: React.VFC<Props> = (props: Props) => {
  const [sort, setSort] = useState<boolean>(false);
  const { websitesPerUpdatedAt } = useWebsites();

  if (!websitesPerUpdatedAt) return <Loading/>;
  const [before, after] = websitesPerUpdatedAt.slice(-2);

  const jobs: Job[] = (() => {
    if (props.website) {
      return after.websites.find(website => website.name === props.website.name).jobs;
    }

    return after.websites.reduce((result, current) => {
      return [...result, ...current.jobs];
    }, []);
  })();

  const beforeJobs: Job[] = (() => {
    if (props.website) {
      return before.websites.find(website => website.name === props.website.name).jobs;
    }

    return before.websites.reduce((result, current) => {
      return [...result, ...current.jobs];
    }, [] as Job[]);
  })();

  const handleChangeWebsite = (website?: Website): void => {
    props.onChangeWebsite(website);
  };

  const handleChangeSort = (checked: boolean) => {
    setSort(checked);
  };

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <WebsitesSelect selected={props.website} onChange={handleChangeWebsite} websites={after.websites}/>
        <Checkbox
          label='求人数の多い順に並び替え'
          checked={sort}
          onChange={handleChangeSort}
        />
        <LastUpdatedAt updatedAt={after.updated_at}/>
      </Box>

      <JobsBarChart
        jobs={jobs}
        sort={sort}
      />

      <JobsTable
        website={props.website}
        jobs={jobs}
        beforeJobs={beforeJobs}
      />
    </>
  );
};

export default DailyPanel;
