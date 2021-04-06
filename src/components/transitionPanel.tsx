import React from 'react';
import { useWebsites } from '../contexts';
import { Loading, JobsLineChart } from '../components';

export const TransitionPanel: React.FC = () => {
  const { websitesPerYear } = useWebsites();

  return (
    <>
      {!websitesPerYear && <Loading/>}
      {websitesPerYear && (
        <>
          <JobsLineChart websitesWithUpdatedAt={websitesPerYear}/>
        </>
      )}
    </>
  );
};
