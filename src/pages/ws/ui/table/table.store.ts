import { CellMeasurerCache } from 'react-virtualized'
import { makeAutoObservable, toJS } from 'mobx'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import zoneStore from '@store/filterZone'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { RowHeight } from './constants'

class TableStore {
  public rowToScroll = 0
  public cache!: CellMeasurerCache
  public measureFuncMap = new Map<number, Function | null>()

  public get isFiltered() {
    return toJS(datasetStore.filteredNo).length > 0
  }

  public get isDrawerActive() {
    return variantStore.drawerVisible
  }

  public get isCompactView() {
    return columnsStore.viewType === ViewTypeEnum.Compact
  }

  constructor() {
    makeAutoObservable(this)
  }

  public createCache() {
    this.cache = new CellMeasurerCache({
      minHeight: RowHeight[columnsStore.viewType],
      defaultHeight: RowHeight[columnsStore.viewType],
    })
  }

  public setRowToScroll(index: number) {
    this.rowToScroll = index
  }

  public openVariant(index: number, datasetName: string) {
    if (window.getSelection()?.toString() || datasetStore.isXL) return

    if (!variantStore.drawerVisible) {
      columnsStore.setColumns(columnsStore.getColumnsForOpenDrawer())
      columnsStore.showColumns()
      variantStore.setDsName(datasetName)
      variantStore.setDrawerVisible(true)
    }

    const idx = this.isFiltered ? toJS(datasetStore.filteredNo)[index] : index

    datasetStore.setSelectedVariantNumber(idx)
    variantStore.setIndex(idx)
    variantStore.fetchVarinatInfoAsync()

    this.setRowToScroll(index)
  }

  public async loadData() {
    const datasetVariantsAmount = toJS(datasetStore.filteredNo).length
    const lastLoadedVariant = datasetStore.indexFilteredNo

    const isNeedToLoadMore =
      datasetVariantsAmount > 0 && lastLoadedVariant < datasetVariantsAmount

    if (isNeedToLoadMore) {
      await datasetStore.fetchFilteredTabReportAsync()
    } else if (datasetVariantsAmount === 0 && !datasetStore.reportsLoaded) {
      await datasetStore.fetchTabReportAsync()
    }
  }

  public resetFilters() {
    filterStore.resetData()
    zoneStore.resetAllSelectedItems()
    datasetStore.clearZone()
    datasetStore.initDatasetAsync()
  }

  public clearStore() {
    this.measureFuncMap.clear()
    this.cache.clearAll()
    this.rowToScroll = 0
  }
}

export default new TableStore()
