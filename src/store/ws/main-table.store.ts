import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import variantStore from '@store/ws/variant'
import zoneStore from '@store/ws/zone'
import {
  TCondition,
  TItemsCount,
} from '@service-providers/common/common.interface'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { ITabReport } from '@service-providers/dataset-level/dataset-level.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import { IWsListQuery, WsListAsyncStore } from './ws-list.async.store'

const INCREASE_INDEX = 50

export class MainTable {
  private readonly wsList = new WsListAsyncStore()
  tabReport: ITabReport[] = []

  selectedVariantNumber?: number
  variantsAmount = 0
  indexTabReport = 0
  indexFilteredNo = 0

  isLoadingTabReport = false
  isFetchingMore = false
  isFilterDisabled = false
  reportsLoaded = false

  memorizedConditions:
    | {
        conditions: ReadonlyArray<TCondition>
        activePreset: string
        zone: any[]
      }
    | undefined = undefined

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.wsListQuery,
      query => {
        if (datasetStore.isXL) return

        if (!datasetStore.datasetName) {
          this.wsList.reset()
        } else {
          this.wsList.setQuery(query)
        }
      },
    )

    reaction(
      () => this.wsRecords,
      () => {
        this.indexFilteredNo = 0
        this.fetchFilteredTabReportAsync()
      },
    )
  }

  public get wsListData() {
    return this.wsList
  }

  private get wsListQuery(): IWsListQuery {
    const conditions = !filterPresetsStore.activePreset
      ? filterStore.conditions
      : []
    return {
      datasetName: datasetStore.datasetName,
      filter: filterPresetsStore.activePreset,
      conditions,
      zone: zoneStore.zone,
    }
  }

  public get wsRecords() {
    return this.wsList.data?.records
  }

  public get filteredNo(): number[] {
    return this.wsRecords
      ? this.wsRecords.map((variant: { no: number }) => variant.no)
      : []
  }

  public get statAmount(): TItemsCount | undefined {
    return filterStore.conditions.length || zoneStore.zone.length
      ? this.wsList.data?.filteredCounts
      : this.wsList.data?.totalCounts
  }

  setSelectedVariantNumber(index: number | undefined) {
    this.selectedVariantNumber = index
  }

  setIsLoadingTabReport(value: boolean) {
    this.isLoadingTabReport = value
  }

  async fetchTabReportAsync() {
    if (
      this.indexTabReport !== 0 &&
      this.indexTabReport < this.variantsAmount
    ) {
      this.isFetchingMore = true
    }

    if (this.variantsAmount > this.indexTabReport) {
      const arrayLength =
        this.variantsAmount < INCREASE_INDEX
          ? this.variantsAmount
          : INCREASE_INDEX

      const seq = Array.from(
        { length: arrayLength },
        (_, i) => i + this.indexTabReport,
      )

      await this._fetchTabReportAsync(datasetStore.datasetName, seq)

      runInAction(() => {
        this.indexTabReport += INCREASE_INDEX
      })
    }
  }

  get fixedStatAmount() {
    const variantCounts = this.statAmount?.[0] ?? null
    const dnaVariantsCounts = this.statAmount?.[1] ?? null
    const transcriptsCounts = this.statAmount?.[2] ?? null

    return { variantCounts, dnaVariantsCounts, transcriptsCounts }
  }

  async _fetchTabReportAsync(dsName: string, seq: number[]) {
    if (seq.length === 0) {
      this.setIsLoadingTabReport(false)
      this.isFetchingMore = false

      return
    }

    const tabReport = await datasetProvider.getTabReport({
      ds: dsName,
      schema: 'xbr',
      seq,
    })

    runInAction(() => {
      this.tabReport = [...this.tabReport, ...tabReport]
      this.reportsLoaded = this.tabReport.length === this.filteredNo.length
      this.isFetchingMore = false
    })

    this.setIsLoadingTabReport(false)
  }

  async fetchFilteredTabReportAsync() {
    let seq: number[] = []

    if (
      this.selectedVariantNumber !== undefined &&
      this.selectedVariantNumber > 0
    ) {
      const lastVariant = this.filteredNo[this.filteredNo.length - 1]

      const currentSet = Math.ceil(this.selectedVariantNumber / INCREASE_INDEX)
      const lastVariantInSet = currentSet * INCREASE_INDEX

      seq =
        lastVariantInSet >= lastVariant
          ? this.filteredNo
          : this.filteredNo.slice(0, lastVariantInSet)
    } else {
      seq = this.filteredNo.slice(
        this.indexFilteredNo,
        this.indexFilteredNo + INCREASE_INDEX,
      )
    }

    if (this.indexFilteredNo === 0) {
      this.setIsLoadingTabReport(true)
      this.tabReport = []
    } else {
      this.isFetchingMore = true
    }

    await this._fetchTabReportAsync(datasetStore.datasetName, seq)

    this.indexFilteredNo += INCREASE_INDEX
    this.isFetchingMore = false
    // eslint-disable-next-line unicorn/no-useless-undefined
    this.setSelectedVariantNumber(undefined)
  }

  // update zone tags if smth was added in drawer
  async fetchWsTagsAsync() {
    if (datasetStore.isXL) return

    const wsTags = await wsDatasetProvider.getWsTags({
      ds: datasetStore.datasetName,
      rec: variantStore.index,
    })

    runInAction(() => {
      zoneStore.tags = [...wsTags['op-tags'], ...wsTags['check-tags']].filter(
        item => item !== '_note',
      )
    })
  }

  memorizeFilterConditions() {
    this.memorizedConditions = {
      conditions: toJS(filterStore.conditions),
      activePreset: filterPresetsStore.activePreset,
      zone: toJS(zoneStore.zone),
    }
  }

  resetData() {
    this.variantsAmount = 0
    this.tabReport = []
  }
}

export default new MainTable()
