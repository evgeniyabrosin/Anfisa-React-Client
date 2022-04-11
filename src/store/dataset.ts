/* eslint-disable max-lines */
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DsStatType, StatListType } from '@declarations'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import presetStore from '@store/filterPreset'
import variantStore from '@store/variant'
import {
  IRecordDescriptor,
  TCondition,
  TItemsCount,
} from '@service-providers/common/common.interface'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { IDsStatArguments } from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { IWsListArguments } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import { addToActionHistory } from '@utils/addToActionHistory'
import { fetchStatunitsAsync } from '@utils/fetchStatunitsAsync'
import {
  IDsListArguments,
  ITabReport,
} from './../service-providers/dataset-level/dataset-level.interface'
import { IZoneDescriptor } from './../service-providers/ws-dataset-support/ws-dataset-support.interface'
import dirinfoStore from './dirinfo'
import operations from './operations'

const INCREASE_INDEX = 50

export class DatasetStore {
  dsStat: DsStatType = {}
  startDsStat: DsStatType = {}
  variantsAmount = 0
  tabReport: ITabReport[] = []
  genes: string[] = []
  genesList: string[] = []
  tags: string[] = []
  samples: string[] = []
  selectedVariantNumber?: number

  wsRecords: IRecordDescriptor[] = []
  offset = 0
  filteredNo: number[] = []

  datasetName = ''
  activePreset = ''
  prevPreset = ''
  conditions: TCondition[] = []
  startPresetConditions: TCondition[] = []
  zone: any[] = []
  statAmount: TItemsCount | null = null
  memorizedConditions:
    | { conditions: TCondition[]; activePreset: string; zone: any[] }
    | undefined = undefined

  indexTabReport = 0
  indexFilteredNo = 0

  isXL = true
  isLoadingTabReport = false
  isFetchingMore = false
  isLoadingDsStat = false
  isFilterDisabled = false

  reportsLoaded = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsXL(value: boolean) {
    this.isXL = value
  }

  setIndexTabReport(value: number): void {
    this.indexTabReport = value
  }

  setIndexFilteredNo(value: number): void {
    this.indexFilteredNo = value
  }

  setFilteredNo(value: number[]): void {
    this.filteredNo = value
  }

  setTableOffest(value: number) {
    this.offset = value
  }

  setIsFilterDisabled(value: boolean) {
    this.isFilterDisabled = value
  }

  setActivePreset(value: string) {
    this.activePreset = value
  }

  setPrevPreset(value: string) {
    this.prevPreset = value
  }

  setSelectedVariantNumber(index: number | undefined) {
    this.selectedVariantNumber = index
  }

  resetActivePreset() {
    this.activePreset = ''
    presetStore.setIsPresetDataModified()
  }

  setIsLoadingTabReport(value: boolean) {
    this.isLoadingTabReport = value
  }

  setZoneIndex(zone: [string, string[]], index: number): void {
    this.zone[index] = zone
  }

  setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  addZone(zone: [string, string[], false?]) {
    if (zone[1].length === 0) {
      this.zone = this.zone.filter(item => item[0] !== zone[0])

      return
    }

    if (this.zone.length === 0) {
      this.zone = [...this.zone, zone]

      return
    }

    const indexOfExistingZone = this.zone.findIndex(elem => elem[0] === zone[0])

    indexOfExistingZone !== -1
      ? (this.zone[indexOfExistingZone] = zone)
      : (this.zone = [...this.zone, zone])
  }

  removeZone(zone: [string, string[]]) {
    this.zone.map((item, index) => {
      if (item[0] === zone[0]) {
        this.setZoneIndex(zone, index)
      }
    })

    this.zone = this.zone.filter(item => item[1].length > 0)
  }

  clearZone() {
    this.zone = []
  }

  async setConditionsAsync() {
    await this.fetchDsStatAsync()
  }

  resetPrevPreset() {
    this.prevPreset = ''
  }

  resetData() {
    this.datasetName = ''
    this.genes = []
    this.genesList = []
    this.samples = []
    this.tags = []
    this.dsStat = {}
    this.startDsStat = {}
    this.variantsAmount = 0
    this.statAmount = null
    this.prevPreset = ''
    this.wsRecords = []
    this.tabReport = []
  }

  resetConditions() {
    this.startPresetConditions = []
  }

  async initDatasetAsync(datasetName: string = this.datasetName) {
    this.datasetName = datasetName

    await dirinfoStore.fetchDsinfoAsync(datasetName)

    const isTabReportEmpty = this.tabReport.length === 0
    const isWsRecordsEmpty = this.wsRecords.length === 0
    const shouldDataBeUpdated = isTabReportEmpty && isWsRecordsEmpty

    if (shouldDataBeUpdated) {
      await this.fetchWsListAsync(this.isXL, 'withoutTabReport')

      await this.fetchFilteredTabReportAsync()

      this.fetchDsStatAsync()
    }
  }

  async fetchDsStatAsync(
    shouldSaveInHistory = true,
    bodyFromHistory?: IDsStatArguments,
  ): Promise<DsStatType> {
    this.isLoadingDsStat = true

    const localBody: IDsStatArguments = {
      ds: this.datasetName,
      tm: 0,
    }

    const { conditions } = filterStore

    if (!this.isFilterDisabled && conditions.length > 0) {
      localBody.conditions = conditions
    }

    if (this.activePreset && this.conditions.length === 0) {
      localBody.filter = this.activePreset
    }

    if (shouldSaveInHistory) {
      addToActionHistory(localBody, true)
    }

    const checkedBodyFromHistory = bodyFromHistory ?? localBody
    const body = shouldSaveInHistory ? localBody : checkedBodyFromHistory

    const result = await filteringRegimeProvider.getDsStat(body)

    dtreeStore.setStatRequestId(result['rq-id'])

    const conditionFromHistory = checkedBodyFromHistory.conditions

    if (conditionFromHistory) {
      this.conditions = conditionFromHistory
    }

    const statList = result['stat-list']

    fetchStatunitsAsync(statList)

    runInAction(() => {
      this.dsStat = result

      if (Object.keys(this.startDsStat).length === 0) {
        this.startDsStat = this.dsStat
      }

      if (this.isXL) {
        this.statAmount = result['filtered-counts']
      }

      this.variantsAmount = result['total-counts']['0']
      this.isLoadingDsStat = false
    })

    return result
  }

  updatePresetLoad(dsStatData: DsStatType) {
    filterStore.resetSelectedFilters()
    this.startPresetConditions = dsStatData.conditions

    filterStore.setConditionsFromPreset(dsStatData.conditions)

    if (!this.isXL) this.fetchWsListAsync()
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

      await this._fetchTabReportAsync(this.datasetName, seq)

      runInAction(() => {
        this.indexTabReport += INCREASE_INDEX
      })
    }
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

    await this._fetchTabReportAsync(this.datasetName, seq)

    this.indexFilteredNo += INCREASE_INDEX
    this.isFetchingMore = false
    // eslint-disable-next-line unicorn/no-useless-undefined
    this.setSelectedVariantNumber(undefined)
  }

  async fetchTagSelectAsync() {
    if (this.isXL) return

    const tagSelect = await wsDatasetProvider.getTagSelect({
      ds: this.datasetName,
    })

    runInAction(() => {
      this.tags = [...tagSelect['tag-list']].filter(item => item !== '_note')
    })
  }

  async fetchWsTagsAsync() {
    if (this.isXL) return

    const wsTags = await wsDatasetProvider.getWsTags({
      ds: this.datasetName,
      rec: variantStore.index,
    })

    runInAction(() => {
      this.tags = [...wsTags['op-tags'], ...wsTags['check-tags']].filter(
        item => item !== '_note',
      )
    })
  }

  async fetchWsListAsync(isXL?: boolean, kind?: string) {
    this.setIsLoadingTabReport(true)

    const params: IWsListArguments | IDsListArguments = {
      ds: this.datasetName,
      filter: this.activePreset,
    }

    const { conditions } = filterStore

    if (!this.isFilterDisabled) {
      params.conditions = kind === 'reset' ? [] : conditions
      if (!isXL) {
        ;(params as IWsListArguments).zone = this.zone
      }
    }

    this.indexFilteredNo = 0

    if (isXL) {
      const dsList = await datasetProvider.getDsList(params)
      const taskResult = await operations.getJobStatusAsync(dsList.task_id)

      runInAction(() => {
        this.filteredNo = taskResult?.data?.[0].samples
          ? taskResult.data[0].samples.map(
              (variant: { no: number }) => variant.no,
            )
          : []
      })
    } else {
      const wsList = await wsDatasetProvider.getWsList(params)
      runInAction(() => {
        this.filteredNo = wsList.records
          ? wsList.records.map((variant: { no: number }) => variant.no)
          : []

        this.statAmount = wsList['filtered-counts']
        this.wsRecords = wsList.records
      })
    }

    if (kind !== 'withoutTabReport') await this.fetchFilteredTabReportAsync()

    return this.filteredNo
  }

  async fetchZoneListAsync(zone: string) {
    const zoneList = (await wsDatasetProvider.getZoneList({
      ds: this.datasetName,
      zone,
    })) as IZoneDescriptor

    runInAction(() => {
      zone === 'Symbol'
        ? (this.genes = zoneList.variants)
        : (this.genesList = zoneList.variants)
    })
  }

  async fetchSamplesZoneAsync() {
    const zoneList = (await wsDatasetProvider.getZoneList({
      ds: this.datasetName,
      zone: 'Has_Variant',
    })) as IZoneDescriptor

    runInAction(() => {
      this.samples = zoneList.variants
    })
  }

  setStatList(statList: StatListType) {
    this.dsStat['stat-list'] = statList
  }

  memorizeFilterConditions() {
    this.memorizedConditions = {
      conditions: toJS(filterStore.conditions),
      activePreset: this.activePreset,
      zone: toJS(this.zone),
    }
  }

  get fixedStatAmount() {
    const variantCounts = this.statAmount?.[0] ?? null
    const dnaVariantsCounts = this.statAmount?.[1] ?? null
    const transcriptsCounts = this.statAmount?.[2] ?? null

    return { variantCounts, dnaVariantsCounts, transcriptsCounts }
  }
}

export default new DatasetStore()
