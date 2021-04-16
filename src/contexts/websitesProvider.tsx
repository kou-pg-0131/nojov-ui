import React, { useContext, createContext } from 'react';
import { Website } from '../domain';
import { NojovAPIClient } from '../infrastructures';
import { subMonths } from 'date-fns';
import useSWR from 'swr';

type Context = {
  websitesSinceHalfYearAgo?: { updated_at: Date; websites: Website[] }[];
};

const WebsitesContext = createContext<Context>({});

type Props = {
  children: React.ReactNode;
};

export const WebsitesProvider: React.FC<Props> = (props: Props) => {
  const apiClient = new NojovAPIClient();

  const { data: websitesSinceHalfYearAgo } = useSWR<{ websites: Website[]; updated_at: Date; }[]>('/api/websites', () => apiClient.getWebsites(subMonths(new Date(), 6)));

  return (
    <WebsitesContext.Provider value={{ websitesSinceHalfYearAgo }}>
      {props.children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): Context => useContext(WebsitesContext);
