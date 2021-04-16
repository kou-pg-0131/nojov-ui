import React, { useContext, createContext, useState, useEffect } from 'react';
import { Website } from '../domain';
import { NojovAPIClient } from '../infrastructures';
import { subMonths } from 'date-fns';

type Context = {
  websitesSinceHalfYearAgo?: { updated_at: Date; websites: Website[] }[];
};

const WebsitesContext = createContext<Context>({});

type Props = {
  children: React.ReactNode;
};

export const WebsitesProvider: React.FC<Props> = (props: Props) => {
  const [websitesSinceHalfYearAgo, setWebsitesSinceHalfYearAgo] = useState<{ websites: Website[]; updated_at: Date; }[]>();

  const apiClient = new NojovAPIClient();

  useEffect(() => {
    apiClient.getWebsites(subMonths(new Date(), 6)).then(resp => {
      setWebsitesSinceHalfYearAgo(resp);
    });
  }, []);

  return (
    <WebsitesContext.Provider value={{ websitesSinceHalfYearAgo }}>
      {props.children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): Context => useContext(WebsitesContext);
