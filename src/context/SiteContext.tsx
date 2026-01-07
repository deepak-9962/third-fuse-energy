import { createContext, useContext } from 'react';
import defaultSiteData from '@/content/locales/en/site.json';

export type SiteData = typeof defaultSiteData;

const SiteContext = createContext<SiteData>(defaultSiteData);

export const SiteProvider = SiteContext.Provider;

export const useSiteData = () => useContext(SiteContext);
