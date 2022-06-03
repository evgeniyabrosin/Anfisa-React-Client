import { useEffect, useRef } from 'react'

interface IDisposableStore {
  dispose: () => void
}

interface IStoreConstructor<
  Store extends IDisposableStore,
  Args extends unknown[] = unknown[],
> {
  new (...args: Args): Store
}

export const useStore = <
  Store extends IDisposableStore,
  Args extends unknown[],
>(
  ctor: IStoreConstructor<Store, Args>,
  ...args: Args
): Store => {
  const storeRef = useRef<Store>()
  if (!storeRef.current) {
    storeRef.current = new ctor(...args)
  }

  useEffect(() => {
    return () => {
      storeRef.current?.dispose()
    }
  }, [])

  return storeRef.current
}
