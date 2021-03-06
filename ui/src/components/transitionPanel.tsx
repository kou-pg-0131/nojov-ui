import React from 'react';
import { Box } from '@material-ui/core';
import { useWebsites } from '../contexts';
import { Website } from '../domain';
import { Loading, JobsLineChartWithHighcharts as JobsLineChart, LastUpdatedAt, WebsitesSelect } from '../components';

type Props = {
  website?: Website;
  onChangeWebsite: (website?: Website) => void;
};

const TransitionPanel: React.VFC<Props> = (props: Props) => {
  const { websitesPerUpdatedAt } = useWebsites();

  if (!websitesPerUpdatedAt) return <Loading/>;

  const updatedAt = websitesPerUpdatedAt.slice(-1)[0].updated_at;

  const websites: Website[] = websitesPerUpdatedAt.map(item => item.websites).flat().filter((elm, idx, self) => (
    self.findIndex(website => website.name === elm.name) === idx
  ));

  const handleChangeWebsite = (website?: Website) => {
    props.onChangeWebsite(website);
  };

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <WebsitesSelect selected={props.website} onChange={handleChangeWebsite} websites={websites}/>
        <LastUpdatedAt updatedAt={updatedAt}/>
      </Box>
      <JobsLineChart website={props.website} websitesWithUpdatedAt={websitesPerUpdatedAt}/>
    </>
  );
};

export default TransitionPanel;
