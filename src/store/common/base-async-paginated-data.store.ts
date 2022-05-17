import { action, computed, makeObservable, observable } from 'mobx'

import { BaseAsyncDataStore } from './base-async-data.store'

type TClassConstructor<T> = new () => T

type TBaseAsyncPaginatedDataStoreOptions = {
  initialPagesCounts: number
}

type TBaseAsyncDataStoreQuery<Store> = Store extends BaseAsyncDataStore<
  any,
  infer Query
>
  ? Query
  : never

const defaultOptions: TBaseAsyncPaginatedDataStoreOptions = {
  initialPagesCounts: 1,
}

export abstract class BaseAsyncPaginatedDataStore<
  AsyncDataStore extends BaseAsyncDataStore<any, any>,
> {
  private readonly initialPagesCounts: number
  private readonly storeClass: TClassConstructor<AsyncDataStore>
  private readonly _pages: AsyncDataStore[] = []

  protected constructor(
    storeClass: TClassConstructor<AsyncDataStore>,
    options?: Partial<TBaseAsyncPaginatedDataStoreOptions>,
  ) {
    this.storeClass = storeClass

    const { initialPagesCounts } = { ...options, ...defaultOptions }

    this.initialPagesCounts = initialPagesCounts

    makeObservable<BaseAsyncPaginatedDataStore<AsyncDataStore>, '_pages'>(
      this,
      {
        _pages: observable,
        pages: computed,
        lastPage: computed,
        pagesCount: computed,
        addPage: action,
        setPagesCount: action,
        reset: action,
        invalidate: action,
        invalidatePage: action,
      },
    )

    window.queueMicrotask(() => this.reset())
  }

  public get pages(): ReadonlyArray<AsyncDataStore> {
    return this._pages
  }

  public get firstPage(): AsyncDataStore | undefined {
    return this._pages[0]
  }

  public get lastPage(): AsyncDataStore | undefined {
    return this._pages.length > 0
      ? this.pages[this._pages.length - 1]
      : undefined
  }

  public get pagesCount(): number {
    return this._pages.length
  }

  public get hasNextPage(): boolean {
    return !!this.getNextPageQuery()
  }

  public addPage(): void {
    const query = this.getNextPageQuery()

    if (query) {
      const newPage = new this.storeClass()
      newPage.setQuery(query)
      this._pages.push(newPage)
    }
  }

  public setPagesCount(count: number): void {
    let needToAdd = count - this._pages.length

    while (needToAdd > 0) {
      this.addPage()
      needToAdd--
    }
  }

  public reset(): void {
    this._pages.splice(0)
    this.setPagesCount(this.initialPagesCounts)
  }

  public invalidate(): void {
    this._pages.forEach(page => page.invalidate())
  }

  public invalidatePage(pageNumber: number): void {
    this._pages[pageNumber]?.invalidate()
  }

  protected abstract getPageQuery(
    pageNum: number,
  ): TBaseAsyncDataStoreQuery<AsyncDataStore> | undefined

  private getNextPageQuery():
    | TBaseAsyncDataStoreQuery<AsyncDataStore>
    | undefined {
    return this.getPageQuery(this._pages.length)
  }
}
