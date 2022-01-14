import React, { useEffect } from 'react'

import { SessionStoreManager } from '../core/storage-management/session-store-manager'

export interface ISessionStoreDataProviderProps<T = any> {
  storeKey: string
  values: T
  storePrefix?: string
}

export const SessionStoreDataProvider = <T,>({
  children,
  storeKey,
  values,
  storePrefix,
}: React.PropsWithChildren<ISessionStoreDataProviderProps<T>>): JSX.Element => {
  useEffect(() => {
    SessionStoreManager.write(storeKey, values, storePrefix)
  }, [storeKey, values, storePrefix])

  return children as JSX.Element
}
