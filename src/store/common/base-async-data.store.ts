import {
  action,
  comparer,
  computed,
  makeObservable,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
  reaction,
  runInAction,
  toJS,
} from 'mobx'

export type TBaseDataStoreOptions = {
  keepPreviousData?: boolean
}

export type TBaseDataStoreFetchOptions = {
  abortSignal: AbortSignal
}

// TODO: automatic data and cache invalidation with timeout
// TODO: automatic refetch in background
// TODO: error handling (may be show error toast for all)

const defaultOptions: TBaseDataStoreOptions = {
  keepPreviousData: false,
}

export abstract class BaseAsyncDataStore<Data, Query> {
  private _lastUpdate = 0
  private _didInvalidate = false
  private _isFetching = false
  private _error: Error | null = null
  private _query: Query | undefined
  private _data: Data | undefined

  private abortController: AbortController | null = null
  private readonly cache: Map<string, { lastUpdate: number; data: Data }> =
    new Map()

  protected constructor(options: TBaseDataStoreOptions = {}) {
    makeObservable<
      BaseAsyncDataStore<Data, Query>,
      | '_lastUpdate'
      | '_didInvalidate'
      | '_isFetching'
      | '_error'
      | '_query'
      | '_data'
      | 'setData'
      | 'resetState'
    >(this, {
      _lastUpdate: observable,
      _didInvalidate: observable,
      _isFetching: observable,
      _error: observable,
      _query: observable,
      _data: observable,
      isFetching: computed,
      lastUpdate: computed,
      isLoading: computed,
      error: computed,
      query: computed.struct,
      data: computed,
      setQuery: action,
      setData: action,
      invalidate: action,
      reset: action,
      resetState: action,
    })

    const { keepPreviousData } = { ...defaultOptions, ...options }

    let lastOnlineQuery: Query | undefined
    let disposeObserver: () => void

    onBecomeObserved(this, 'data', () => {
      const disposeInvalidator = reaction(
        () => this.query,
        () => {
          lastOnlineQuery = this.query
          this.reconcile(keepPreviousData ?? false)
        },
        {
          fireImmediately: !comparer.structural(lastOnlineQuery, this.query),
        },
      )

      const disposeFetcher = reaction(
        () => this._didInvalidate,
        didInvalidate => {
          if (didInvalidate) {
            this.reconcile(true)
          }
        },
      )

      disposeObserver = () => {
        disposeInvalidator()
        disposeFetcher()
      }
    })

    onBecomeUnobserved(this, 'data', () => {
      disposeObserver()
    })
  }

  public get isFetching(): boolean {
    return this._isFetching
  }

  public get lastUpdate(): number {
    return this._lastUpdate
  }

  public get isLoading(): boolean {
    return this._isFetching && !this._lastUpdate
  }

  public get error(): Error | null {
    return this._error
  }

  public get query(): Readonly<Query> | undefined {
    return toJS(this._query)
  }

  public setQuery(query: Query) {
    this._query = query
  }

  public invalidate(): void {
    if (this._isFetching) {
      return
    }

    if (this.query) {
      const cacheKey = this.getCacheKey(this.query)

      if (cacheKey) {
        this.cache.delete(cacheKey)
      }
    }

    this._didInvalidate = true
  }

  public reset(): void {
    this.resetState()
    this.cache.clear()
  }

  public get data(): Data | undefined {
    return this._data
  }

  // usually you don't want to set data manually
  // but, it can be useful when you have partial response
  protected setData(data: Data | undefined): void {
    runInAction(() => {
      this._data = data
      this._lastUpdate = Date.now()
    })
  }

  protected clearCache(): void {
    this.cache.clear()
  }

  protected abstract fetch(
    query: Query,
    options: TBaseDataStoreFetchOptions,
  ): Promise<Data>

  // by default cache is disabled with `undefined` key
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getCacheKey(query: Query): string | undefined {
    return undefined
  }

  private reconcileFromCache(query: Query): boolean {
    const cacheKey = this.getCacheKey(query)

    if (cacheKey) {
      const cached = this.cache.get(cacheKey)

      if (cached) {
        runInAction(() => {
          this._didInvalidate = false
          this._isFetching = false
          this._error = null
          this._data = cached.data
          this._lastUpdate = cached.lastUpdate
        })

        return true
      }
    }

    return false
  }

  private resetState(): void {
    this._lastUpdate = 0
    this._didInvalidate = false
    this._isFetching = false
    this._error = null
    this._query = undefined
    this._data = undefined
  }

  private reconcile(keepData: boolean): void {
    if (this._isFetching && this.abortController) {
      this.abortController.abort()
    }
    const query = this.query

    if (query === undefined) {
      this.resetState()

      return
    }

    if (this.reconcileFromCache(query)) {
      return
    }

    this.abortController = new AbortController()

    runInAction(() => {
      this._didInvalidate = false
      this._isFetching = true
      this._error = null

      if (!keepData) {
        this._data = undefined
      }
    })

    this.fetch(query, { abortSignal: this.abortController.signal }).then(
      data => {
        const lastUpdate = Date.now()

        if (comparer.structural(query, this.query)) {
          runInAction(() => {
            this._data = data
            this._lastUpdate = lastUpdate
            this._isFetching = false
          })
        }

        const cacheKey = this.getCacheKey(query)

        if (cacheKey) {
          this.cache.set(cacheKey, { lastUpdate, data })
        }
      },
      error => {
        if (!(error instanceof DOMException) || error.name !== 'AbortError') {
          runInAction(() => {
            this._isFetching = false
            this._error = error
          })
        }
      },
    )
  }
}

export type TSafeAsyncDataStore<Store extends BaseAsyncDataStore<any, any>> =
  Omit<Store, 'setQuery' | 'setData' | 'reset' | 'invalidate' | 'fetch'>
