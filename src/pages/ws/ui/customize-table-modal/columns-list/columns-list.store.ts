import { makeAutoObservable } from 'mobx'

import { IColumns } from '@declarations'
import columnsStore, { columnsToIgnore } from '@store/wsColumns'

export class ColumnListStore {
  public get filteredColumns(): IColumns[] {
    return columnsStore.getExtendedColumns.filter(
      (column: IColumns) =>
        column.title
          .toLocaleLowerCase()
          .includes(columnsStore.searchColumnValue.toLocaleLowerCase()) &&
        !columnsToIgnore.includes(column.title),
    )
  }

  constructor() {
    makeAutoObservable(this)
  }

  public toggleColumnHidden = (name: string) => {
    const newColumns = columnsStore.getExtendedColumns.map(col => {
      if (col.title === name) {
        col.hidden = !col.hidden
      }

      return col
    })

    columnsStore.setColumns(newColumns)
  }

  public reorderColumns = (sourceIndex: number, destinationIndex?: number) => {
    const items = Array.from(this.filteredColumns)
    const startItemsLength = items.length

    const [reorderItem] = items.splice(sourceIndex, 1)

    if (typeof destinationIndex === 'number') {
      items.splice(destinationIndex, 0, reorderItem)
    }

    if (items.length !== startItemsLength) {
      return
    }

    const extendedColumns: IColumns[] = [
      ...columnsToIgnore.map(col => ({ title: col, hidden: false })),
      ...items,
    ]

    columnsStore.setColumns(extendedColumns)
  }

  public get visibleColumnsAmount(): number {
    return this.filteredColumns.filter(column => column.hidden === false).length
  }
}
