import { makeAutoObservable, runInAction } from 'mobx'

import {
  ANYType,
  DsStatType,
  TabReportType,
  WsListType,
  WsTagsType,
} from '../..'
import { ExportTypeEnum } from '../core/enum/export-type.enum'
import { getApiUrl } from '../core/get-api-url'
import { tableColumnMap } from '../core/table-column-map'

class DatasetStore {
  dsStat: DsStatType = {}
  wsList: WsListType = {}
  reccnt: ANYType = []
  tabReport: TabReportType[] = []
  wsTags: WsTagsType = {}
  selectedTags: string[] = []
  columns: string[] = Object.values(tableColumnMap)

  activePreset = ''
  searchColumnValue = ''

  isLoadingTabReport = false
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

  setSearchColumnValue(value: string) {
    this.searchColumnValue = value
  }

  setActivePreset(value: string) {
    this.activePreset = value
  }

  removeTag(tagName: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)
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

  async fetchDsStatAsync(dsName: string | null) {
    this.isLoadingDsStat = true

    const response = await fetch(getApiUrl(`ds_stat?ds=${dsName}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.dsStat = result
    })
    this.isLoadingDsStat = false
  }

  async fetchWsListAsync(dsName: string | null) {
    const response = await fetch(getApiUrl('ws_list'), {
      method: 'POST',
      body: JSON.stringify({ ds: dsName }),
    })

    const result = await response.json()

    runInAction(() => {
      this.wsList = result
    })
  }

  async fetchReccntAsync(dsName: string | null) {
    const response = await fetch(getApiUrl(`reccnt?ds=${dsName}&rec=${11}`))
    const result = await response.json()

    runInAction(() => {
      this.reccnt = result
    })
  }

  async fetchTabReportAsync(dsName: string | null) {
    this.isLoadingTabReport = true

    const seq = Array.from(new Array(10).keys())

    const response = await fetch(
      getApiUrl(
        `tab_report?ds=${dsName}&schema=xbr&seq=${encodeURIComponent(
          JSON.stringify(seq),
        )}`,
      ),
    )

    const result = await response.json()

    runInAction(() => {
      this.tabReport = result
    })

    this.isLoadingTabReport = false
  }

  async fetchWsTagsAsync(dsName: string | null) {
    const response = await fetch(getApiUrl(`ws_tags?ds=${dsName}&rec=${0}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.wsTags = result
      this.selectedTags = result['check-tags']
    })
  }

  async exportReportExcelAsync(
    dsName: string | null,
    exportType?: ExportTypeEnum,
  ) {
    if (exportType === ExportTypeEnum.Excel) {
      const response = await fetch(getApiUrl(`export?ds=${dsName}`), {
        method: 'POST',
      })

      const result = await response.json()
      const responseFile = await fetch(getApiUrl(result.fname))

      await responseFile.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${dsName}.xlsx`
        a.click()

        return
      })
    }

    if (exportType === ExportTypeEnum.CSV) {
      const response = await fetch(
        getApiUrl(`csv_export?ds=${dsName}&schema=xbr`),
        {
          method: 'POST',
        },
      )

      await response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${dsName}.csv`
        a.click()

        return
      })
    }
  }
}

export default new DatasetStore()
