import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job } from '../domain';
import { NojovAPIClient } from '../infrastructures';

type Context = {
  updatedAt?: Date;
  jobs?: Job[];
};

const JobsContext = createContext<Context>({});

type Props = {
  children: React.ReactNode;
};

export const JobsProvider: React.FC<Props> = (props: Props) => {
  const [jobs, setJobs] = useState<Job[]>();
  const [updatedAt, setUpdatedAt] = useState<Date>();

  useEffect(() => {
    new NojovAPIClient().getLatest().then(response => {
      setJobs(response.today);
      setUpdatedAt(new Date(response.updated_at));
    });
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, updatedAt }}>
      {props.children}
    </JobsContext.Provider>
  );
};

export const useJobs = (): Context => useContext(JobsContext);
