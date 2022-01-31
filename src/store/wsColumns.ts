/* eslint-disable max-lines */
import { makeAutoObservable } from 'mobx'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'

class ColumnsStore {
  columns: any[] = Object.values(tableColumnMap)
  viewType: ViewTypeEnum = ViewTypeEnum.Cozy
  selectedColumns: string[] = Object.values(tableColumnMap)
  searchColumnValue = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSearchColumnValue(value: string) {
    this.searchColumnValue = value
  }

  resetSearchColumnValue() {
    this.searchColumnValue = ''
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
    const clearedColumns =
      typeof this.columns[0] !== 'string'
        ? this.columns.map(column => ({
            title: column.title,
            hidden: true,
          }))
        : this.columns.map(column => ({
            title: column,
            hidden: true,
          }))

    this.setColumns(clearedColumns)
  }

  setColumns(columns: any[]) {
    this.columns = columns
  }

  resetColumnsToDefault() {
    const defaultColumns = Object.values(tableColumnMap).map(column => ({
      title: column,
      hidden: false,
    }))

    this.setColumns(defaultColumns)
  }

  showColumns() {
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
