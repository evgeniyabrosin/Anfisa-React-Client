import { ReactElement, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import columnsStore from '@store/wsColumns'
import { ColumnNameItem } from './column-name-item'

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  ...draggableStyle,
  left: '0px !important',
  top: draggableStyle.top - 130 || 600,
})

const reorder = (
  list: string[],
  startIndex: number,
  endIndex: number,
): string[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

export const ColumnsList = observer(
  (): ReactElement => {
    const [columns, setColumns] = useState<string[]>(columnsStore.getColumns)

    useEffect(() => {
      setColumns(columnsStore.getColumns)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnsStore.searchColumnValue])

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) {
        return
      }

      const items = reorder(
        columns,
        result.source.index,
        result.destination.index,
      )

      const activeColumns = items.filter(item =>
        columnsStore.columns.includes(item),
      )

      columnsStore.setColumns(activeColumns)
      setColumns(items)
    }

    return (
      <div className="mt-3 w-64 pr-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={item}
                    index={index}
                    isDragDisabled={!!columnsStore.searchColumnValue}
                  >
                    {(providedDraggable, snapshot) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          providedDraggable.draggableProps.style,
                        )}
                      >
                        <ColumnNameItem name={item} />
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
