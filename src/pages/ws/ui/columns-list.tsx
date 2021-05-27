import { ReactElement, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { ANYType } from '@declarations'
import datasetStore from '@store/dataset'
import { Box } from '@ui/box'
import { ColumnNameItem } from './column-name-item'

const Root = styled(Box)`
  border-bottom: 1px solid #bfbfbf;
  margin-top: 12px;
  padding-bottom: 19px;
`

const getItemStyle = (isDragging: boolean, draggableStyle: ANYType) => ({
  // border: isDragging ? '1px solid grey' : 'none',
  userSelect: 'none',
  ...draggableStyle,
  left: '0px !important',
  top: draggableStyle.top - 300 || 600,
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
    const [columns, setColumns] = useState<string[]>(datasetStore.getColumns)

    useEffect(() => {
      setColumns(datasetStore.getColumns)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datasetStore.searchColumnValue])

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
        datasetStore.columns.includes(item),
      )

      datasetStore.setColumns(activeColumns)
      setColumns(items)
    }

    return (
      <Root>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={item}
                    index={index}
                    isDragDisabled={!!datasetStore.searchColumnValue}
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
      </Root>
    )
  },
)
