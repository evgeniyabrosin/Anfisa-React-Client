import { ReactElement, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import { IColumns } from '@declarations'
import columnsStore from '@store/wsColumns'
import { ColumnNameItem } from './column-name-item'

const getItemStyle = (draggableStyle: any) => ({
  userSelect: 'none',
  ...draggableStyle,
  left: '0px !important',
  top: draggableStyle.top - 130 || 600,
})

export const ColumnsList = observer(
  (): ReactElement => {
    const [columns, setColumns] = useState<IColumns[]>(
      columnsStore.getExtendedColumns,
    )

    useEffect(() => {
      setColumns(columnsStore.getExtendedColumns)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnsStore.searchColumnValue, columnsStore.columns])

    const onDragEnd = (result: DropResult) => {
      const items = Array.from(columns)

      const [reorderItem] = items.splice(result.source.index, 1)

      if (result.destination) {
        items.splice(result.destination.index, 0, reorderItem)
      }

      columnsStore.setColumns(items)
      setColumns(items)
    }

    const filteredColumns = columns.filter(item =>
      item.title
        .toLocaleLowerCase()
        .includes(columnsStore.searchColumnValue.toLocaleLowerCase()),
    )

    return (
      <div className="mt-3 w-64 pr-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredColumns.map((item, index) => (
                  <Draggable
                    key={item.title}
                    draggableId={item.title}
                    index={index}
                    isDragDisabled={!!columnsStore.searchColumnValue}
                  >
                    {providedDraggable => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={getItemStyle(
                          providedDraggable.draggableProps.style,
                        )}
                      >
                        <ColumnNameItem
                          name={item.title}
                          setColumns={setColumns}
                          columns={columns}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  },
)
