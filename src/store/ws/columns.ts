/* eslint-disable max-lines */
import { makeAutoObservable } from 'mobx'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'
import variantStore from '@store/ws/variant'
import { variantColumnTable } from '@pages/ws/columns'

export const columnsToIgnore: string[] = ['Gene', 'Variant']

class ColumnsStore {
  columns: any[] = Object.values(tableColumnMap)
  viewType: ViewTypeEnum = ViewTypeEnum.Cozy
  selectedColumns: string[] = Object.values(tableColumnMap)
  searchColumnValue = ''

  get selectedDataColumns() {
    return this.selectedColumns.map(column =>
      variantColumnTable.find(item => item.Header === column),
    )
  }

  get collapsedSelectedDataColumns() {
    return this.selectedDataColumns.slice(0, 2)
  }

  get columnDataListForRender() {
    const { drawerVisible } = variantStore

    return drawerVisible
      ? this.collapsedSelectedDataColumns
      : this.selectedDataColumns
  }

  constructor() {
    makeAutoObservable(this)
  }

  setSearchColumnValue(value: string) {
    this.searchColumnValue = value
  }

  resetSearchColumnValue() {
    this.searchColumnValue = ''
  }

  resetColumns() {
    this.columns = this.selectedColumns
  }

  setViewType(viewType: ViewTypeEnum) {
    this.viewType = viewType
  }

  selectAllColumns() {
    const clearedColumns =
      typeof this.columns[0] !== 'string'
        ? this.columns.map(column => ({
            title: column.title,
            hidden: false,
          }))
        : this.columns.map(column => ({
            title: column,
            hidden: false,
          }))

    this.setColumns(clearedColumns)
  }

  clearAllColumns() {
    const clearedColumns = this.getExtendedColumns.map(column => ({
      title: column.title,
      hidden: columnsToIgnore.includes(column.title) ? false : true,
    }))

    this.setColumns(clearedColumns)
  }

  setColumns(columns: any[]) {
    this.columns = columns
  }

  closeDrawer() {
    const columns = this.selectedColumns.map(column => ({
      title: column,
      hidden: false,
    }))

    this.setColumns(columns)

    variantStore.setDrawerVisible(false)
  }

  filterColumns() {
    this.selectedColumns = this.columns
      .filter(column => !column.hidden)
      .map(column => column.title ?? column)
  }

  getColumnsForOpenDrawer() {
    const columnsForOpenDrawer = this.getExtendedColumns
      .filter(column => !column.hidden)
      .splice(0, 2)

    return columnsForOpenDrawer
  }

  get getExtendedColumns() {
    if (typeof this.columns[0] !== 'string') {
      return this.columns
    }

    const extendedColumns = this.columns.map(column => ({
      title: column,
      hidden: false,
    }))

    return extendedColumns
  }
}

export default new ColumnsStore()
