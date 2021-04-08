import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { LastUpdatedAt, Loading, JobsTable, JobsBarChartWithRecharts as JobsBarChart, Checkbox, WebsitesSelect } from '../components';
import { Job, Website } from '../domain';

type Props = {
  website?: Website;
  onChangeWebsite: (website?: Website) => void;
};

export const DailyPanel: React.FC<Props> = (props: Props) => {
  const [sort, setSort] = useState<boolean>(false);
  const { websites, updatedAt } = useWebsites();

  if (!websites || !updatedAt) return <Loading/>;

  const jobs: Job[] = (() => {
    if (props.website) {
      return props.website.jobs;
    }

    return websites?.reduce((result, current) => {
      return [...result, ...current.jobs];
    }, []);
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
        <WebsitesSelect selected={props.website} onChange={handleChangeWebsite} websites={websites}/>
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
        website={props.website}
        jobs={jobs}
      />
    </>
  );
};
