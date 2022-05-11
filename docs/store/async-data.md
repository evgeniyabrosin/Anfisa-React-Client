# Async data store

* [Overview](#overview)
* [API Reference](#api-reference)
* [Examples](#examples)
* [Advanced Usage](#advanced-usage)

## Overview

To work with data that can be retrieved asynchronously, it is preferable
to use a separate store for each entity.

The project implements a basic abstract class for creating such
stores `BaseAsyncDataStore`.
It takes care of all the work needed to update the data, maintaining
state corresponding to the query, and provides access to this state.

The `BaseAsyncDataStore<Data, Query>` is a generic class. You need to specify
two types when using it:

* `Data` - type of data that stores
* `Query` - type that describes the parameters of a data query

The `BaseAsyncDataStore` is an abstract class. And you should not use it
directly. Instead, you must create a class that extends the `BaseAsyncDataStore`
and define for it `fetch` method.

For example.

```ts
import { BaseAsyncDataStore, TBaseDataStoreOptions } from '@store/common'

class RandomNumberAsyncStore extends BaseAsyncDataStore<number, number> {
  constructor() {
    super()
  }

  protected fetch(query: number, options: TBaseDataStoreOptions): Promise<number> {
    return Promise.new((resolve, reject) => {
      if (number < 1000) {
        setTimeout(() => resolve(Math.floor(Math.random() * query)), 1000)
      } else {
        setTimeout(() => reject(new Error('out of bounds')), 1000)
      }
    })
  }
}
```

In the simplest case, that's all of you need.

_Notes_:

* Do not call the `fetch` method directly. This method does not update the data
  in the store, it only describes how to fetch it.
* Usually, you should use service provider methods within your `fetch`
  implementation.

To set query parameters for the data use the `setQuery` method:

```ts
const randomNumberStore = new RandomNumberStore()
randomNumberStore.setQuery(300)
```

The `data` property used to access the data:

```ts
const randomNumber = randomNumberStore.data
```

Remember that `data` can be either a value of type `Data` or `undefined` in
case the data has not yet been received.

## API Reference

### Constructor Options

* `keepPreviousData: boolean` (default: `false`) - specifies whether to save the
  current data when `query` is changed.

### Properties

* `query: Query | undefined` - current query or `undefined`
* `data: Data | undefined` - data corresponding to the current query
* `isFetching: boolean` - `true` if an asynchronous operation is in progress
* `lastUpdate: number` - timestamp of the last data update (`0` - the data was
  not loaded)
* `isLoading: boolean` - `true` if an asynchronous operation is in progress and
  data hasn't been loaded
* `error: Error | null` - an error that occurred as a result of fetching data
  or `null` if data received successfully

### Methods

* `setQuery(query: Query)` - set the current query parameters
* `invalidate()` - force re-request data for the current query
* `reset()` - reset store state to initial

### Note

The `BaseAsyncDataStore` implements the concept of lazy data loading. This means
that calling the `setQuery` method does not directly call `fetch` and
data query. The data update will only be performed if access to the `data`
property is used somewhere and the query parameters
have been changed.

## Examples

As a rule, classes inherited from `BaseAsyncDataStore` are not used by
themselves, but are public or private members of other storage classes.

```tsx
import { makeAutoObservable, reaction } from 'mobx'
import { BaseAsyncDataStore, TBaseDataStoreOptions } from '@store/common'

type TRandomNumberQuery = {
  min: number
  max: number
}

class RandomNumberAsyncStore extends BaseAsyncDataStore<TRandomNumberQuery, number> {
  constructor() {
    super()
  }

  protected fetch({
    min,
    max
  }: TRandomNumberQuery, options: TBaseDataStoreOptions): Promise<number> {
    return Promise.new((resolve, reject) => {
      if (max < 1000 && min < max) {
        setTimeout(() => resolve(min + Math.floor(Math.random() * (max - min))), 1000)
      } else {
        setTimeout(() => reject(new Error('out of bounds')), 1000)
      }
    })
  }
}

class RandomGeneratorStore {
  public readonly randomNumber = new RandomNumberAsyncStore()

  public min = 0
  public max = 100

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.randomNumberQuery,
      query => this.randomNumber.setQuery(query),
      {
        fireImmediately: true,
      }
    )
  }

  public setMin(value: number): void {
    this.min = value
  }

  public setMax(value: number): void {
    this.max = value
  }

  private get randomNumberQuery(): TRandomNumberQuery {
    return {
      min: this.min,
      max: this.max,
    }
  }
}

const randomGeneratorStore = new RandomGeneratorStore()

const RandomGenerator = observer(() => {
  const { min, max, randomNumber } = randomGeneratorStore

  return (
    <div>
      <div>
        <input
          type="number"
          value={min}
          onChange={(event) => randomGeneratorStore.setMin(parseInt(event.target.value, 10))}
        />
        <input
          type="number"
          value={max}
          onChange={(event) => randomGeneratorStore.setMax(parseInt(event.target.value, 10))}
        />
        <button onClick={() => randomNumber.invalidate()}>
          Generate New!
        </button>
      </div>
      <div>
        {randomNumber.isFetching && <div>Generating new number...</div>}
        <div>
          Current number: {randomNumber.data}
        </div>
        {randomNumber.error && (
          <div>Error: {randomNumber.error.message}</div>
        )}
      </div>
    </div>
  )
})
```

## Advanced Usage

### Custom getters

You can implement your own getters in your class. However, you have to specify
them in the constructor with the `makeObservable(...)` method because MobX
doesn't
support `makeAutoObservable(...)` work for inherited classes

```ts
import { computed } from 'mobx'
import { BaseAsyncDataStore, TBaseDataStoreOptions } from '@store/common'

class RandomNumberAsyncStore extends BaseAsyncDataStore<TRandomNumberQuery, number> {
  constructor() {
    super()

    makeObservable(this, {
      x1000: computed
    })
  }

  get x1000(): number | undefined {
    return this.data !== undefined ? this.data * 1000 : undefined
  }

  protected fetch({
    min,
    max
  }: TRandomNumberQuery, options: TBaseDataStoreOptions): Promise<number> {
    return Promise.new((resolve, reject) => {
      if (max < 1000 && min < max) {
        setTimeout(() => resolve(min + Math.floor(Math.random() * (max - min))), 1000)
      } else {
        setTimeout(() => reject(new Error('out of bounds')), 1000)
      }
    })
  }
}
```

You should avoid extending such classes with members other than getters.

### Caching

Normally, no additional caching of the data is required, and by default it is
disabled.
However, there are cases where it may be useful.

To enable caching, you need to override the protected
method `getCacheKey(query: Query): string | undefined`.
When the result of this method is a non-empty string, the resulting data will be
saved and fetched from the cache for a next-time with a corresponding `query'.

The `invalidate()` method will forcibly remove data from the cache corresponding
to the current `query`.

To completely clear the cache, you can use the protected method `clearCache()`.

