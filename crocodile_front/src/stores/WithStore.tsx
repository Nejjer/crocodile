import React, { FC, ReactNode } from 'react';
import { AppStore, createAppStore } from './index.ts';

export interface AppStoreContext {
  appStore: AppStore;
}

export const StoreCtx = React.createContext<AppStoreContext>(
  null as unknown as AppStoreContext,
);
// eslint-disable-next-line react-refresh/only-export-components
export const appStore = createAppStore();
export const WithStore: FC<{ children: ReactNode }> = ({ children }) => {
  return <StoreCtx.Provider value={{ appStore }}>{children}</StoreCtx.Provider>;
};
