/* eslint-disable max-lines */
import { makeAutoObservable } from 'mobx'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { tableColumnMap } from '@core/table-column-map'

class ColumnsStore {
  columns: string[] = Object.values(tableColumnMap)
  viewType: ViewTypeEnum = ViewTypeEnum.Cozy
  selectedColumns: string[] = Object.values(tableColumnMap)
  searchColumnValue = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSearchColumnValue(value: string) {
    this.searchColumnValue = value
  }

  setViewType(viewType: ViewTypeEnum) {
    this.viewType = viewType
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

  setAllColumn() {
    this.columns = Object.values(tableColumnMap)
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
}

export default new ColumnsStore()
