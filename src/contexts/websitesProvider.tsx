import React, { useContext, createContext } from 'react';
import { Website } from '../domain';
import { NojovAPIClient } from '../lib';
import useSWR from 'swr';

type Context = {
  websitesPerUpdatedAt?: { updated_at: Date; websites: Website[] }[];
};

const WebsitesContext = createContext<Context>({});

type Props = {
  children: React.ReactNode;
};

export const WebsitesProvider: React.FC<Props> = (props: Props) => {
  const apiClient = new NojovAPIClient();

  const { data: websitesPerUpdatedAt } = useSWR<{ websites: Website[]; updated_at: Date; }[]>('/api/websites', () => apiClient.getWebsites());

  return (
    <WebsitesContext.Provider value={{ websitesPerUpdatedAt }}>
      {props.children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): Context => useContext(WebsitesContext);
