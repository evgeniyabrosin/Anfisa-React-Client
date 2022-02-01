import { makeAutoObservable } from 'mobx'

import { IColumns } from '@declarations'
import columnsStore from '../../../../../store/wsColumns'

export class ColumnListStore {
  private columnsToIgnore = new Set(['Gene', 'Variant'])

  public get filteredColumns(): IColumns[] {
    return columnsStore.getExtendedColumns.filter((column: IColumns) =>
      column.title
        .toLocaleLowerCase()
        .includes(columnsStore.searchColumnValue.toLocaleLowerCase()),
    )
  }

  public get columnsToDisplay(): IColumns[] {
    return this.filteredColumns.filter(
      (column: IColumns) => !this.columnsToIgnore.has(column.title),
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
    const items = Array.from(columnsStore.getExtendedColumns)
    const startItemsLength = items.length

    const [reorderItem] = items.splice(sourceIndex, 1)

    if (destinationIndex) {
      items.splice(destinationIndex, 0, reorderItem)
    }

    if (items.length !== startItemsLength) return

    columnsStore.setColumns(items)
  }
}
