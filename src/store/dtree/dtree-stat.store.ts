import { makeAutoObservable, runInAction, toJS } from 'mobx'

import {
  TItemsCount,
  TPropertyStatus,
} from '@service-providers/common/common.interface'
import { dtreeProvider, TDtreeStat } from '@service-providers/decision-trees'
import { getFilteredAttrsList } from '@utils/getFilteredAttrsList'

type TSetSourceParams = {
  datasetName: string
  code: string
  stepIndex: string
}

type TDtreeStatFetchState = {
  isFetching: boolean
  error: Error | null
}

export class DtreeStatStore {
  private datasetName = ''
  private code = 'return False'
  private stepIndex = '0'
  private abortController: AbortController | null = null

  private state: TDtreeStatFetchState = {
    isFetching: false,
    error: null,
  }
  private data: TDtreeStat | undefined = undefined

  private cache: Map<string, TDtreeStat> = new Map()

  constructor() {
    makeAutoObservable<DtreeStatStore, 'cache'>(this, {
      cache: false,
    })
  }

  setSource({ datasetName, code, stepIndex }: TSetSourceParams): void {
    if (this.datasetName !== datasetName || this.code !== code) {
      this.cache.clear()
    }

    this.datasetName = datasetName
    this.code = code
    this.stepIndex = stepIndex

    this.fetch()
  }

  invalidate(): void {
    this.fetch(true)
  }

  getAttributeStatusByName(name: string): TPropertyStatus | undefined {
    return this.list?.find(prop => prop.name === name)
  }

  get list(): TPropertyStatus[] | undefined {
    return this.data?.list && getFilteredAttrsList(toJS(this.data.list))
  }

  get totalCounts(): TItemsCount | undefined {
    return this.data?.totalCounts
  }

  get filteredCounts(): TItemsCount | undefined {
    return this.data?.filteredCounts
  }

  get isFetching(): boolean {
    return this.state.isFetching
  }

  get isLoading(): boolean {
    return this.isFetching && !this.data
  }

  get error(): Error | null {
    return this.state.error
  }

  private fetch(force?: boolean) {
    if (this.state.isFetching && this.abortController) {
      this.abortController.abort()
    }

    if (this.cache.has(this.stepIndex)) {
      runInAction(() => {
        this.state = {
          isFetching: false,
          error: null,
        }
        this.data = this.cache.get(this.stepIndex)
      })

      this.abortController = null

      if (!force) {
        return
      }
    }

    this.abortController = new AbortController()

    runInAction(() => {
      this.state = {
        isFetching: true,
        error: null,
      }
      this.data = undefined
    })

    dtreeProvider
      .getFullDtreeStat(
        {
          ds: this.datasetName,
          no: this.stepIndex,
          code: this.code,
        },
        {
          onPartialResponse: data =>
            runInAction(() => {
              this.data = data
            }),
          abortSignal: this.abortController.signal,
        },
      )
      .then(
        data => {
          runInAction(() => {
            this.data = data
          })
          this.cache.set(this.stepIndex, data)
        },
        error => {
          if (!(error instanceof DOMException) || error.name !== 'AbortError') {
            this.state = {
              ...this.state,
              error,
            }
          }
        },
      )
  }
}
