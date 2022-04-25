import { ReactElement } from 'react'
import cn from 'classnames'

import functionPanelStore from '@pages/filter/ui/panels/function-panel/function-panel.store'
import { ICustomInheritanceModeArgs } from '@service-providers/common/common.interface'
import { getScenarioValue } from '@utils/filter-refiner/getScenarioValue'

interface ICustomInheritanceModeViewProps {
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: ICustomInheritanceModeArgs
}

export const CustomInheritanceModeView = ({
  isFilterActive,
  filterExpression,
}: ICustomInheritanceModeViewProps): ReactElement => {
  const { problemGroups } = functionPanelStore
  const scenarioArray = Object.entries(filterExpression['scenario'])

  return (
    <div
      className={cn('text-14 pb-4 pl-5', {
        'bg-blue-tertiary': isFilterActive,
      })}
    >
      <div className="mt-4">
        <div className="px-4 text-grey-blue">Scenario</div>

        {problemGroups.map((group, idx) => (
          <div
            className={cn('flex items-center pl-4 py-1', {
              'pt-2': idx === 0,
            })}
            key={group}
          >
            <span>{group}</span>

            <span className="ml-1 text-grey-blue">
              {getScenarioValue(group, scenarioArray)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
