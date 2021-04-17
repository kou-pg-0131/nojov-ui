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

export const WebsitesProvider: React.VFC<Props> = (props: Props) => {
  const apiClient = new NojovAPIClient();

  const { data: websitesPerUpdatedAt } = useSWR<{ websites: Website[]; updated_at: Date; }[]>('/api/websites', () => apiClient.getWebsites());

  return (
    <WebsitesContext.Provider value={{ websitesPerUpdatedAt: websitesPerUpdatedAt?.sort((a, b) => a.updated_at < b.updated_at ? -1 : 1) }}>
      {props.children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): Context => useContext(WebsitesContext);
