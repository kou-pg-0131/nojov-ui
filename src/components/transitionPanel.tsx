import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { Website } from '../domain';
import { Loading, JobsLineChart, LastUpdatedAt, WebsitesSelect } from '../components';

export const TransitionPanel: React.FC = () => {
  const [selectedWebsite, setSelectedWebsite] = useState<Website>();
  const { websitesPerYear } = useWebsites();

  if (!websitesPerYear) return <Loading/>;

  const updatedAt = websitesPerYear.sort((a, b) => a.updated_at < b.updated_at ? 1 : -1)[0].updated_at;

  const websites: Website[] = websitesPerYear.map(item => item.websites).flat().filter((elm, idx, self) =>
    self.findIndex(website => website.name === elm.name) === idx
  );

  const handleChangeWebsite = (website?: Website) => {
    setSelectedWebsite(website);
  };

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <WebsitesSelect selected={selectedWebsite} onChange={handleChangeWebsite} websites={websites}/>
        <LastUpdatedAt updatedAt={updatedAt}/>
      </Box>
      <JobsLineChart website={selectedWebsite} websitesWithUpdatedAt={websitesPerYear}/>
    </>
  );
};
