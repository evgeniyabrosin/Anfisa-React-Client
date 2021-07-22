/* eslint-disable max-lines */
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'

import { DsStatType, StatList, TabReportType, WsTagsType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { getApiUrl } from '@core/get-api-url'
import filterStore from '@store/filter'
import zoneStore from './filterZone'
import columnsStore from './wsColumns'

const INCREASE_INDEX = 50

class DatasetStore {
  dsStat: DsStatType = {}
  tabReport: TabReportType[] = []
  wsTags: WsTagsType = {}
  genes: string[] = []
  tags: string[] = []
  samples: string[] = []

  offset = 0
  filteredNo: number[] = []

  datasetName = ''
  activePreset = ''
  conditions: any[] = []
  zone: any[] = []
  statAmount: number[] = []

  indexTabReport = 0
  indexFilteredNo = 0

  isLoadingTabReport = false
  isFetchingMore = false
  isLoadingDsStat = false
  isFilterDisabled = false

  constructor() {
    makeAutoObservable(this)
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

  setIsLoadingTabReport(value: boolean) {
    this.isLoadingTabReport = value
  }

  setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  addZone(zone: [string, string[]]) {
    if (zone[1].length === 0) {
      this.clearZone()

      return
    }

    this.zone = [...this.zone, zone]
  }

  clearZone() {
    this.zone = []
  }

  async setConditionsAsync(conditions: any[][]) {
    if (!conditions[0]) {
      this.conditions = []

      return await this.fetchWsListAsync()
    }

    const groupCondtionsIndex = this.conditions.findIndex(
      (item: any) => item[1] === conditions[0][1],
    )

    if (groupCondtionsIndex !== -1) {
      this.conditions.splice(groupCondtionsIndex, 1)
    }

    this.conditions = this.conditions.concat(conditions)

    return await this.fetchWsListAsync()
  }

  removeFunctionCondition(functionName: string) {
    this.conditions = this.conditions.filter(
      ([_, name]) => name !== functionName,
    )

    this.fetchWsListAsync()
  }

  removeCondition({
    subGroup,
    itemName,
  }: {
    subGroup: string
    itemName: string
  }) {
    const cloneConditions = cloneDeep(this.conditions)

    const subGroupIndex = cloneConditions.findIndex(
      item => item[1] === subGroup,
    )

    const conditionKind = cloneConditions.find(item => item[1] === subGroup)[0]

    if (conditionKind === FilterKindEnum.enum) {
      const filteredItems = cloneConditions[subGroupIndex][3].filter(
        (item: string) => item !== itemName,
      )

      if (filteredItems.length === 0) {
        cloneConditions.splice(subGroupIndex, 1)
      } else {
        cloneConditions[subGroupIndex][3] = filteredItems
      }
    } else {
      cloneConditions.splice(subGroupIndex, 1)
    }

    this.conditions = cloneConditions

    this.fetchWsListAsync()
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

    this.fetchWsListAsync()
  }

  resetData() {
    this.indexTabReport = 0
    this.indexFilteredNo = 0
    this.tabReport = []
    this.wsTags = {}
    this.dsStat = {}
    this.filteredNo = []
    zoneStore.selectedTags = []
    columnsStore.searchColumnValue = ''
  }

  async initDatasetAsync(datasetName: string) {
    this.resetData()
    this.datasetName = datasetName

    await this.fetchDsStatAsync()
    await this.fetchWsTagsAsync()

    this.filteredNo.length === 0
      ? await this.fetchTabReportAsync()
      : await this.fetchFilteredTabReportAsync()
  }

  get getFilterRefiner() {
    const groups: Record<string, StatList[]> = {}

    this.dsStat['stat-list'] &&
      this.dsStat['stat-list'].forEach((item: StatList) => {
        if (groups[item.vgroup]) {
          groups[item.vgroup] = [...groups[item.vgroup], item]
        } else {
          groups[item.vgroup] = [item]
        }
      })

    return groups
  }

  async fetchDsStatAsync() {
    this.isLoadingDsStat = true
    this.isLoadingTabReport = true

    const body = new URLSearchParams({
      ds: this.datasetName,
    })

    if (!this.isFilterDisabled) {
      body.append('conditions', JSON.stringify(this.conditions))
      body.append('zone', JSON.stringify(this.zone))
    }

    this.activePreset && body.append('filter', this.activePreset)

    const response = await fetch(getApiUrl(`ds_stat`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.dsStat = result
      this.statAmount = get(result, 'filtered-counts', [])
      this.isLoadingDsStat = false
    })
  }

  updatePresetLoad(dsStatData: any) {
    this.conditions = dsStatData.conditions
    filterStore.selectedFilters = {}

    dsStatData.conditions?.forEach((condition: any[]) => {
      const name = condition[1]

      const filterItem = dsStatData['stat-list']?.find(
        (item: any) => item.name === name,
      )

      if (condition[0] === FilterKindEnum.enum) {
        condition[3]?.forEach((value: string) => {
          filterStore.addSelectedFilters({
            group: filterItem.vgroup,
            groupItemName: name,
            variant: [value, 0],
          })
        })
      }
    })

    this.fetchWsListAsync()
  }

  async fetchTabReportAsync() {
    const variantsAmount = get(this, 'dsStat.total-counts.0', 0)

    if (this.indexTabReport === 0) {
      this.isLoadingTabReport = true
    }

    if (this.indexTabReport !== 0 && this.indexTabReport < variantsAmount) {
      this.isFetchingMore = true
    }

    if (variantsAmount > this.indexTabReport) {
      const arrayLength =
        variantsAmount < INCREASE_INDEX ? variantsAmount : INCREASE_INDEX

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
      this.isLoadingTabReport = false
      this.isFetchingMore = false

      return
    }

    const response = await fetch(getApiUrl(`tab_report`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ds: String(dsName),
        schema: 'xbr',
        seq: JSON.stringify(seq),
      }),
    })

    const result = await response.json()

    runInAction(() => {
      this.tabReport = [...this.tabReport, ...result]
      this.isLoadingTabReport = false
      this.isFetchingMore = false
    })
  }

  async fetchFilteredTabReportAsync() {
    const seq = this.filteredNo.slice(
      this.indexFilteredNo,
      this.indexFilteredNo + INCREASE_INDEX,
    )

    if (this.indexFilteredNo === 0) {
      this.isLoadingTabReport = true
      this.tabReport = []
    } else {
      this.isFetchingMore = true
    }

    await this._fetchTabReportAsync(this.datasetName, seq)

    this.indexFilteredNo += INCREASE_INDEX
    this.isFetchingMore = false
  }

  async fetchWsTagsAsync() {
    const response = await fetch(
      getApiUrl(`ws_tags?ds=${this.datasetName}&rec=${0}`),
      {
        method: 'POST',
      },
    )

    const result = await response.json()

    runInAction(() => {
      this.wsTags = result
      this.tags = [...result['op-tags'], ...result['check-tags']]
    })
  }

  async fetchWsListAsync() {
    const body = new URLSearchParams({
      ds: this.datasetName,
    })

    if (!this.isFilterDisabled) {
      body.append('conditions', JSON.stringify(this.conditions))
      body.append('zone', JSON.stringify(this.zone))
    }

    this.activePreset && body.append('filter', this.activePreset)

    const response = await fetch(getApiUrl(`ws_list`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    this.indexFilteredNo = 0

    runInAction(() => {
      this.filteredNo = result.records
        ? result.records.map((variant: { no: number }) => variant.no)
        : []

      this.statAmount = get(result, 'filtered-counts', [])
    })

    await this.fetchFilteredTabReportAsync()

    return this.filteredNo
  }

  async fetchZoneListAsync(zone: string) {
    const body = new URLSearchParams({ ds: this.datasetName, zone })

    const response = await fetch(getApiUrl(`zone_list`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.genes = result.variants
    })
  }

  async fetchSamplesZoneAsync() {
    const body = new URLSearchParams({
      ds: this.datasetName,
      zone: 'Has_Variant',
    })

    const response = await fetch(getApiUrl(`zone_list`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.samples = result.variants
    })
  }
}

export default new DatasetStore()
