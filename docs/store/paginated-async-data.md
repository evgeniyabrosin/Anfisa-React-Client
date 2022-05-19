# Paginated async data store

* [Overview](#overview)
* [API Reference](#api-reference)
* [Usage example](#usage-example)

## Overview

In some cases, there is a need to load data page by page. To do this, you can
use the abstract class  `BaseAsyncPaginatedDataStore<BaseAsyncDataStore>` that
automates the routine.

First, you need to describe the class for loading one page of data.
For example, let's describe a class that generates some random numbers.

```ts
type TRandomNumbersQuery = {
  min: number
  max: number
  count: number
}

class RandomNumbersAsyncStore extends BaseAsyncDataStore<number[], TRandomNumbersQuery> {
  constructor() {
    super()
  }

  protected fetch(query: TRandomNumbersQuery, options: TBaseDataStoreOptions): Promise<number[]> {
    const { min, max, count } = query

    return Promise.new((resolve, reject) => {
      if (count > 0 && count < 100 && min > 0 && max < 1000) {
        resolve(
          new Array(count)
            .fill(0)
            .map(() => Math.floor(Math.random() * (max - min)) + min)
        )
      } else {
        reject(new Error('out of bounds'))
      }
    })
  }
}
```

Next, we describe a class for working with paged data with the
function `getPageQuery`:

```ts
class NumbersStore extends BaseAsyncPaginatedDataStore<RandomNumbersAsyncStore> {
  private pageSize: number

  constructor(pageSize: number) {
    super();

    this.pageSize = pageSize
  }

  protected getPageQuery(pageNum: number): TRandomNumbersQuery | undefined {
    if (pageNum > 9) {
      return undefined
    }

    return {
      min: pageNum * 100,
      max: (pageNum + 1) * 100,
      count: this.pageSize,
    }
  }

}
```

`getPageQuery` function may return `undefined` which means that the page with
does not exist.

## API Reference

### Constructor Options

* `initialPagesCounts: number` (default: `1`) - specifies how many pages of data will be created initially

### Properties

* `pages: ReadOnlyArray<AsyncDataStore>` - returns read-only array with created
  pages
* `firstPage: AsyncDataStore` - the first page in pages array
* `lastPage: AsyncDataStore` - the last page in pages array
* `pagesCount: number` - number of pages in store
* `hasNextPage: boolean` - returns true if page can be added to the store

### Methods

* `addPage(): void` - add page to store
* `setPagesCount(count: number): void` - adds missing pages to the store (do
  nothing if current `pagesCount` equals of greater than provided)
* `reset(): void` - resets store to initial state
* `invalidate(): void` - invalidates each page in the store

## Usage Example

Let try to use `NumbersStore` from [Overview](#overview) chapter.

```tsx
const PAGE_SIZE = 10

const numbersStore = new NumbersStore(PAGE_SIZE)

const Numbers = observer(() => {

  const {
    pages,
    lastPage: { isFetching },
    hasNextPage
  } = numbersStore

  return (
    <div>
      {pages
        .map((page, pageIndex) =>
          page.data.map((num, index) => (
            <div key={pageIndex * PAGE_SIZE + index}>
              {num}
            </div>
          )))}
      {
        isFetching && (
          <div>
            Loading...
          </div>
        )
      }
      {hasNextPage && (
        <div>
          <button
            disabled={isFetching}
            onClick={() => numbersStore.addPage()}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )

})

```
