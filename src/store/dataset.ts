/* eslint-disable max-lines */
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DsStatType, IRemoveConditionItem, StatListType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { getApiUrl } from '@core/get-api-url'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import variantStore from '@store/variant'
import {
  ICompoundRequestArgs,
  ICustomInheritanceModeArgs,
  IRecordDescriptor,
  TCondition,
  TFuncCondition,
} from '@service-providers/common/common.interface'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { IWsListArguments } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import { addToActionHistory } from '@utils/addToActionHistory'
import { fetchStatunitsAsync } from '@utils/fetchStatunitsAsync'
import { isConditionArgsTypeOf } from '@utils/function-panel/isConditionArgsTypeOf'
import { getFilteredAttrsList } from '@utils/getFilteredAttrsList'
import { FuncStepTypesEnum } from './../core/enum/func-step-types-enum'
import { TFuncArgs } from './../service-providers/common/common.interface'
import {
  IDsListArguments,
  ITabReport,
} from './../service-providers/dataset-level/dataset-level.interface'
import { IZoneDescriptor } from './../service-providers/ws-dataset-support/ws-dataset-support.interface'
import dirinfoStore from './dirinfo'
import operations from './operations'

const INCREASE_INDEX = 50

export type Condition = [string, string, unknown, string[]?, unknown?]

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
  startPresetConditions: Condition[] = []
  zone: any[] = []
  statAmount: number[] = []
  memorizedConditions:
    | { conditions: Condition[]; activePreset: string; zone: any[] }
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

  async setConditionsAsync(conditions: TCondition[], conditionsType?: string) {
    if (!conditions[0]) {
      this.conditions = []
      await this.fetchDsStatAsync()
    } else {
      const groupCondtionsIndex = this.conditions.findIndex(
        (item: any) => item[1] === conditions[0][1],
      )

      if (groupCondtionsIndex !== -1 && conditionsType !== 'func') {
        this.conditions.splice(groupCondtionsIndex, 1)
      }

      this.conditions = this.conditions.concat(conditions)

      await this.fetchDsStatAsync()
    }

    return Array.from({ length: this.statAmount[0] })
  }

  async removeFunctionConditionAsync(functionName: string) {
    this.conditions = this.conditions.filter(
      ([, name]) => name !== functionName,
    )

    await this.fetchDsStatAsync()
  }

  removeCondition({ subGroup, itemName }: IRemoveConditionItem) {
    let cloneConditions: TCondition[] = cloneDeep(this.conditions)

    const subGroupIndex = cloneConditions.findIndex(
      item => item[1] === subGroup,
    )

    const conditionKind = cloneConditions.find(
      item => item![1] === subGroup,
    )![0]

    if (conditionKind === FilterKindEnum.Enum) {
      const filteredItems = cloneConditions[subGroupIndex][3]?.filter(
        (item: string) => item !== itemName,
      )

      if (filteredItems?.length === 0) {
        cloneConditions.splice(subGroupIndex, 1)
      } else {
        cloneConditions[subGroupIndex][3] = filteredItems
      }
    } else if (
      conditionKind === FilterKindEnum.Func &&
      itemName.includes('locus')
    ) {
      cloneConditions = cloneConditions.filter(
        (condition: any) =>
          JSON.stringify(condition[condition.length - 1]) !== itemName,
      )
    } else {
      cloneConditions.splice(subGroupIndex, 1)
    }

    this.conditions = cloneConditions

    this.fetchDsStatAsync()
  }

  removeConditionGroup({ subGroup }: { subGroup: string }) {
    const cloneConditions = cloneDeep(this.conditions)

    const subGroupIndex = cloneConditions.findIndex(
      item => item[1] === subGroup,
    )

    if (subGroupIndex !== -1) {
      cloneConditions.splice(subGroupIndex, 1)
    }

    this.conditions = cloneConditions

    this.fetchDsStatAsync()
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
    this.statAmount = []
    this.prevPreset = ''
    this.wsRecords = []
    this.tabReport = []
  }

  resetConditions() {
    this.conditions = []
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

      this.filteredNo.length === 0
        ? await this.fetchTabReportAsync()
        : await this.fetchFilteredTabReportAsync()

      this.fetchDsStatAsync()
    }
  }

  async fetchDsStatAsync(
    shouldSaveInHistory = true,
    bodyFromHistory?: URLSearchParams,
  ): Promise<DsStatType> {
    this.isLoadingDsStat = true

    const localBody = new URLSearchParams({
      ds: this.datasetName,
      tm: '0',
    })

    if (!this.isFilterDisabled) {
      this.conditions.length > 0 &&
        localBody.append('conditions', JSON.stringify(this.conditions))
    }

    this.activePreset &&
      this.conditions.length === 0 &&
      localBody.append('filter', this.activePreset)

    if (shouldSaveInHistory) {
      addToActionHistory(localBody, true)
    }

    const body = shouldSaveInHistory ? localBody : bodyFromHistory

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    dtreeStore.setStatRequestId(result['rq-id'])
    result['stat-list'] = getFilteredAttrsList(result['stat-list'])

    const conditionFromHistory = bodyFromHistory?.get('conditions')

    if (conditionFromHistory) {
      this.conditions = JSON.parse(conditionFromHistory)
    }

    const statList = result['stat-list']

    fetchStatunitsAsync(statList)

    runInAction(() => {
      this.dsStat = result

      if (Object.keys(this.startDsStat).length === 0) {
        this.startDsStat = this.dsStat
      }

      if (this.isXL) {
        this.statAmount = get(result, 'filtered-counts', [])
      }

      this.variantsAmount = result['total-counts']['0']
      this.isLoadingDsStat = false
    })

    return result
  }

  getVariantValue(groupItemName: string, condition: TFuncCondition) {
    const conditionArgs = condition[4] as TFuncArgs

    if (groupItemName === FuncStepTypesEnum.GeneRegion) {
      return JSON.stringify(conditionArgs)
    }

    if (groupItemName === FuncStepTypesEnum.CustomInheritanceMode) {
      return JSON.stringify(conditionArgs).replace(/[{}]/g, '')
    }

    if (
      isConditionArgsTypeOf<ICompoundRequestArgs>(
        groupItemName,
        conditionArgs,
        FuncStepTypesEnum.CompoundRequest,
      )
    ) {
      return `"request:" ${JSON.stringify(conditionArgs.request).replace(
        /[{}]/g,
        '',
      )}`
    }

    return condition[condition.length - 2] as string
  }

  getConditionValue(
    groupItemName: FuncStepTypesEnum,
    condition: TFuncCondition,
  ) {
    const conditionArgs = condition[4]

    if (
      isConditionArgsTypeOf<ICustomInheritanceModeArgs>(
        groupItemName,
        conditionArgs,
        FuncStepTypesEnum.CustomInheritanceMode,
      )
    ) {
      return { scenario: Object.entries(conditionArgs.scenario) }
    }

    return conditionArgs
  }

  updatePresetLoad(dsStatData: any, source?: string) {
    this.conditions = dsStatData.conditions
    filterStore.selectedFilters = {}
    this.startPresetConditions = [...this.conditions]

    dsStatData.conditions?.forEach((condition: any[]) => {
      const groupItemName = condition[1]

      const filterItem = this.startDsStat['stat-list']?.find(
        (item: any) => item.name === groupItemName,
      )

      if (condition[0] === FilterKindEnum.Enum) {
        condition[3]?.forEach((value: string) => {
          filterStore.addSelectedFilters({
            group: filterItem.vgroup,
            groupItemName,
            variant: [value, 0],
          })
        })
      }

      if (condition[0] === FilterKindEnum.Func) {
        const variantValue = this.getVariantValue(
          groupItemName,
          condition as TFuncCondition,
        )

        filterStore.addSelectedFilters({
          group: filterItem.vgroup,
          groupItemName,
          variant: [variantValue, 0],
        })

        const conditionValue = this.getConditionValue(
          groupItemName,
          condition as TFuncCondition,
        )

        filterStore.setFilterCondition(groupItemName, {
          conditions: conditionValue,
          variants: condition[3],
        })
      }

      if (condition[0] === FilterKindEnum.Numeric) {
        filterStore.addSelectedFilters({
          group: filterItem.vgroup,
          groupItemName,
          variant: [groupItemName, condition[condition.length - 1]],
        })

        filterStore.setFilterCondition(
          groupItemName,
          condition[condition.length - 1],
        )
      }
    })

    !source || (this.isXL && this.fetchDsStatAsync())
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

    if (!this.isFilterDisabled) {
      params.conditions = kind === 'reset' ? [] : this.conditions
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

        this.statAmount = get(wsList, 'filtered-counts', []) as number[]
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
      conditions: toJS(this.conditions),
      activePreset: this.activePreset,
      zone: toJS(this.zone),
    }
  }

  applyMemorizedConditions() {
    const { memorizedConditions } = this

    if (memorizedConditions) {
      Object.keys(memorizedConditions).forEach((key: string) => {
        ;(this as any)[key] = (memorizedConditions as any)[key]
      })
    }
  }
}

export default new DatasetStore()
