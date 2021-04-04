import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { format } from 'date-fns';
import { useWebsites } from '../contexts';
import { Layout } from '../layout';
import { Loading, JobsTable, JobsBarChart, Checkbox, WebsitesSelect } from '../components';
import { Job, Website } from '../domain';

const Home: React.FC = () => {
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

  return (
    <Layout>
      {!websites && <Loading/>}
      {websites && jobs && (
        <>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <WebsitesSelect selected={selectedWebsite} onChange={handleChangeWebsite} websites={websites}/>
          <Checkbox label='求人数の多い順に並び替え' onChange={handleChangeSort}/>
          <small>
            最終更新日時: {updatedAt && <time dateTime={updatedAt.toISOString()}>{format(updatedAt, 'yyyy/MM/dd HH:mm')}</time>}
          </small>
          </Box>

          <JobsBarChart
            jobs={jobs}
            sort={sort}
          />

          <JobsTable
            jobs={jobs}
          />
        </>
      )}
    </Layout>
  );
};

export default Home;
