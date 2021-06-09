import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'

import { DsStatType, StatList, TabReportType, WsTagsType } from '@declarations'
import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { getApiUrl } from '@core/get-api-url'
import { tableColumnMap } from '@core/table-column-map'

const INCREASE_INDEX = 50

class DatasetStore {
  dsStat: DsStatType = {}
  tabReport: TabReportType[] = []
  wsTags: WsTagsType = {}
  genes: string[] = []
  tags: string[] = []

  selectedTags: string[] = []
  selectedGenes: string[] = []
  columns: string[] = Object.values(tableColumnMap)
  selectedColumns: string[] = Object.values(tableColumnMap)

  filteredNo: number[] = []

  datasetName = ''
  activePreset = ''
  conditions: any[] = []
  zone: any[] = []
  searchColumnValue = ''

  indexTabReport = 0
  indexFilteredNo = 0

  isLoadingTabReport = false
  isFetchingMore = false
  isLoadingDsStat = false

  constructor() {
    makeAutoObservable(this)
  }

  removeColumn(name: string) {
    this.columns = this.columns.filter(column => column !== name)
  }

  addColumn(name: string) {
    this.columns.push(name)
  }

  clearColumn() {
    this.columns = []
  }

  setSearchColumnValue(value: string) {
    this.searchColumnValue = value
  }

  setActivePreset(value: string) {
    this.activePreset = value
  }

  addTag(tagName: string) {
    this.selectedTags = [...this.selectedTags, tagName]
  }

  removeTag(tagName: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)
  }

  unselectAllTags = () => {
    this.selectedTags = []
  }

  addGene(gene: string) {
    this.selectedGenes = [...this.selectedGenes, gene]
  }

  removeGene(geneName: string) {
    this.selectedGenes = this.selectedGenes.filter(gene => geneName !== gene)
  }

  unselectAllGenes = () => {
    this.selectedGenes = []
  }

  setColumns(columns: string[]) {
    this.columns = columns
  }

  showColumns() {
    this.selectedColumns = this.columns.slice()
  }

  cancelColumns() {
    this.columns = this.selectedColumns.slice()
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

  addConditions(conditions: string[][]) {
    this.conditions = this.conditions.concat(conditions)
  }

  removeCondition(functionName: string) {
    this.conditions = this.conditions.filter(
      ([_, name]) => name !== functionName,
    )
  }

  resetData() {
    this.indexTabReport = 0
    this.indexFilteredNo = 0
    this.tabReport = []
    this.wsTags = {}
    this.dsStat = {}
    this.selectedTags = []
    this.activePreset = ''
    this.searchColumnValue = ''
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

  get getColumns() {
    if (this.searchColumnValue) {
      return Object.values(tableColumnMap).filter(key =>
        key
          .toLocaleLowerCase()
          .includes(this.searchColumnValue.toLocaleLowerCase()),
      )
    }

    return Object.values(tableColumnMap)
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

    const response = await fetch(getApiUrl(`ds_stat?ds=${this.datasetName}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.dsStat = result
      this.isLoadingDsStat = false
    })
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
      conditions: JSON.stringify(this.conditions),
      zone: JSON.stringify(this.zone),
    })

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

    this.filteredNo = result.records
      ? result.records.map((variant: { no: number }) => variant.no)
      : []

    await this.fetchFilteredTabReportAsync()
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

  fetchTagSelectAsync = async () => {
    if (this.selectedTags.length === 0) {
      this.indexTabReport = 0
      await this.fetchTabReportAsync()

      return
    }

    const response = await fetch(
      getApiUrl(
        `tag_select?ds=${this.datasetName}&tag=${this.selectedTags[0]}`,
      ),
    )

    const result = await response.json()

    this.indexFilteredNo = 0
    this.filteredNo = result['tag-rec-list']

    await this.fetchFilteredTabReportAsync()
  }

  async fetchStatFuncAsync(
    unit: string,
    param?: Record<string, string | string[]>,
  ) {
    const body = new URLSearchParams({
      ds: this.datasetName,
      unit,
    })

    param && body.append('param', JSON.stringify(param))

    const response = await fetch(getApiUrl(`statfunc`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    return result
  }

  async fetchDsInfoAsync() {
    const response = await fetch(getApiUrl(`dsinfo?ds=${this.datasetName}`))
    const result = await response.json()

    return result
  }

  async fetchProblemGroupsAsync() {
    const dsInfo = await this.fetchDsInfoAsync()

    return Object.keys(get(dsInfo, 'meta.samples', {}))
  }

  /*
  TODO: May not be needed
  async fetchDsTaskIdAsync({ filter, conditions }: DsListI) {
    const body = new URLSearchParams({ ds: this.datasetName })

    conditions && body.append('conditions', conditions)
    // filter && body.append('filter', filter)
    // conditions && body.append('conditions', conditions)

    const response = await fetch(getApiUrl(`ds_list`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    await this.fetchJobStatusAsync(result['task_id'])
  }

  async fetchJobStatusAsync(taskId: string) {
    const response = await fetch(getApiUrl(`job_status?task=${taskId}`))
    const result = await response.json()

    this.indexFilteredNo = 0

    this.filteredNo = result[0].records
      ? result[0].records.map((variant: { no: number }) => variant.no)
      : []

    await this.fetchFilteredTabReportAsync()
  } */

  async exportReportAsync(exportType?: ExportTypeEnum) {
    const filterParam = this.activePreset ? `&filter=${this.activePreset}` : ''

    if (exportType === ExportTypeEnum.Excel) {
      const response = await fetch(
        getApiUrl(`export?ds=${this.datasetName}${filterParam}`),
        {
          method: 'POST',
        },
      )

      const result = await response.json()
      const responseFile = await fetch(getApiUrl(result.fname))

      await responseFile.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${this.datasetName}.xlsx`
        a.click()

        return
      })
    }

    if (exportType === ExportTypeEnum.CSV) {
      const response = await fetch(
        getApiUrl(`csv_export?ds=${this.datasetName}&schema=xbr${filterParam}`),
        {
          method: 'POST',
        },
      )

      await response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${this.datasetName}.csv`
        a.click()

        return
      })
    }
  }
}

export default new DatasetStore()
