import React, { useContext, createContext, useState, useEffect } from 'react';
import { Website } from '../domain';
import { NojovAPIClient } from '../infrastructures';

type Context = {
  websites?: Website[];
  updatedAt?: Date;
};

const WebsitesContext = createContext<Context>({});

type Props = {
  children: React.ReactNode;
};

export const WebsitesProvider: React.FC<Props> = (props: Props) => {
  const [websites, setWebsites] = useState<Website[]>();
  const [updatedAt, setUpdatedAt] = useState<Date>();

  const apiClient = new NojovAPIClient();

  useEffect(() => {
    apiClient.getLatestWebsites().then(resp => {
      setWebsites(resp.websites);
      setUpdatedAt(resp.updated_at);
    });
  }, []);

  return (
    <WebsitesContext.Provider value={{ websites, updatedAt }}>
      {props.children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): Context => useContext(WebsitesContext);
