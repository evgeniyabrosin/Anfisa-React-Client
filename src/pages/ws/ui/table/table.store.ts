import { makeAutoObservable, toJS } from 'mobx'

import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'

class TableStore {
  public rowToScroll = 0

  public get isFiltered() {
    return toJS(datasetStore.filteredNo).length > 0
  }

  public get isDrawerActive() {
    return variantStore.drawerVisible
  }

  constructor() {
    makeAutoObservable(this)
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

      return
    }

    if (!datasetStore.reportsLoaded) {
      await datasetStore.fetchTabReportAsync()
    }
  }
}

export default new TableStore()
