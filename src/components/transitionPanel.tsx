import React from 'react';
import { Box } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { Website } from '../domain';
import { Loading, JobsLineChartWithHighcharts as JobsLineChart, LastUpdatedAt, WebsitesSelect } from '../components';

type Props = {
  website?: Website;
  onChangeWebsite: (website?: Website) => void;
};

export const TransitionPanel: React.FC<Props> = (props: Props) => {
  const { websitesSinceHalfYearAgo } = useWebsites();

  if (!websitesSinceHalfYearAgo) return <Loading/>;

  const updatedAt = websitesSinceHalfYearAgo.sort((a, b) => a.updated_at < b.updated_at ? 1 : -1)[0].updated_at;

  const websites: Website[] = websitesSinceHalfYearAgo.map(item => item.websites).flat().filter((elm, idx, self) =>
    self.findIndex(website => website.name === elm.name) === idx
  );

  const handleChangeWebsite = (website?: Website) => {
    props.onChangeWebsite(website);
  };

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <WebsitesSelect selected={props.website} onChange={handleChangeWebsite} websites={websites}/>
        <LastUpdatedAt updatedAt={updatedAt}/>
      </Box>
      <JobsLineChart website={props.website} websitesWithUpdatedAt={websitesSinceHalfYearAgo}/>
    </>
  );
};
