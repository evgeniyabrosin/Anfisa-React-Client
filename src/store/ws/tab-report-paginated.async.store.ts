import { reaction } from 'mobx'

import { BaseAsyncPaginatedDataStore } from '@store/common'
import { TabReportAsyncStore, TTabReportQuery } from './tab-report.async.store'
import { WsListAsyncStore } from './ws-list.async.store'

const PAGE_SIZE = 50

export class TabReportPaginatedAsyncStore extends BaseAsyncPaginatedDataStore<TabReportAsyncStore> {
  private readonly wsListAsyncStore: WsListAsyncStore

  constructor(wsListStore: WsListAsyncStore) {
    super(TabReportAsyncStore)

    this.wsListAsyncStore = wsListStore

    reaction(
      () => wsListStore.data,
      () => {
        this.reset()
      },
    )
  }

  protected getPageQuery(pageNum: number): TTabReportQuery | undefined {
    const ds = this.wsListAsyncStore.query?.datasetName
    const seq = this.wsListAsyncStore.data?.records
      .slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
      .map(record => record.no)

    if (!ds || !seq || !seq.length) {
      return undefined
    }

    return {
      ds,
      seq,
    }
  }
}
