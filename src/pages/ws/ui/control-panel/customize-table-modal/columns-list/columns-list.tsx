import { ReactElement } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import columnsStore from '@store/ws/columns'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ColumnListStore } from './columns-list.store'
import { ColumnNameItem } from './components/column-name-item'

const getItemStyle = (draggableStyle: any) => ({
  userSelect: 'none',
  ...draggableStyle,
  left: '0px !important',
  top: draggableStyle.top - 130 || 600,
})

const columnListStore = new ColumnListStore()

export const ColumnsList = observer((): ReactElement => {
  const onDragEnd = (result: DropResult) => {
    columnListStore.reorderColumns(
      result.source.index,
      result.destination?.index,
    )
  }

  const { filteredColumns, toggleColumnHidden } = columnListStore

  return (
    <div className="mt-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredColumns.map((column, index) => (
                <Draggable
                  key={column.title}
                  draggableId={column.title}
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
                      data-testid={MainTableDataCy.customizeTableList}
                    >
                      <ColumnNameItem
                        name={column.title}
                        isChecked={!column.hidden}
                        onClickSwitch={() => toggleColumnHidden(column.title)}
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
})
