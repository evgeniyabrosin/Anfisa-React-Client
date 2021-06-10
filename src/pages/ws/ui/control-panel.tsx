import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { ControlPanelDivider } from './control-panel-divider'
import { EditFilter } from './control-panel-edit-filter'
import { Preset } from './control-panel-preset'
import { Results } from './control-panel-settings'
import { FilterList } from './filter-list'

export const ControlPanel = observer(
  (): ReactElement => {
    const sectionClassName = 'rounded flex bg-white bg-opacity-2 p-4'
    const hasFilters = Object.keys(filterStore.selectedFilters).length > 0

    return (
      <div className="flex pb-3 px-4 bg-blue-dark">
        <div className={sectionClassName}>
          <Preset />

          <ControlPanelDivider />

          <EditFilter />

          <ControlPanelDivider />

          <Results />
        </div>

        {hasFilters && (
          <div className={cn(sectionClassName, 'overflow-hidden ml-3')}>
            <FilterList filters={filterStore.selectedFilters} />
          </div>
        )}
      </div>
    )
  },
)
