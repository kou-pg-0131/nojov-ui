import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { LastUpdatedAt, Loading, JobsTable, JobsBarChart, Checkbox, WebsitesSelect } from '../components';
import { Job, Website } from '../domain';

export const DailyPanel: React.FC = () => {
  const [sort, setSort] = useState<boolean>(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website>();
  const { websites, updatedAt } = useWebsites();

  if (!websites || !updatedAt) return <Loading/>;

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

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <WebsitesSelect selected={selectedWebsite} onChange={handleChangeWebsite} websites={websites}/>
        <Checkbox
          label='求人数の多い順に並び替え'
          labelPlacement='start'
          checked={sort}
          onChange={handleChangeSort}
        />
        <LastUpdatedAt updatedAt={updatedAt}/>
      </Box>

      <JobsBarChart
        jobs={jobs}
        sort={sort}
      />

      <JobsTable
        website={selectedWebsite}
        jobs={jobs}
      />
    </>
  );
};
