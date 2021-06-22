import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import filterStore from '@store/filter'
import { EmptySelectedGroup } from './empty-selected-group'
import { EnumPanel } from './enum-panel'
import { FunctionPanel } from './function-panel'
import { RangePanel } from './range-panel'
import { SelectedGroupHeader } from './selected-group-header'
export const SelectedGroup = observer(
  (): ReactElement => {
    if (!filterStore.selectedGroupItem.name) {
      return <EmptySelectedGroup />
    }

    return (
      <div
        className="bg-blue-light pt-5 px-4 w-1/3 overflow-y-auto"
        style={{ height: 'calc(100vh - 158px)' }}
      >
        <SelectedGroupHeader />

        <div className="bg-white h-px w-full mt-4" />

        {filterStore.selectedGroupItem.kind === FilterKindEnum.enum && (
          <EnumPanel />
        )}
        {filterStore.selectedGroupItem.kind === FilterKindEnum.func && (
          <FunctionPanel />
        )}
        {filterStore.selectedGroupItem.kind === FilterKindEnum.numeric && (
          <RangePanel />
        )}
      </div>
    )
  },
)
