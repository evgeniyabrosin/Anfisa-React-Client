import { ReactElement } from 'react'
import cn from 'classnames'

import { approxOptions } from '@core/approxOptions'
import functionPanelStore from '@pages/filter/ui/panels/function-panel/function-panel.store'
import { ICompoundRequestArgs } from '@service-providers/common/common.interface'
import { getScenarioValue } from '@utils/filter-refiner/getScenarioValue'

interface ICompoundRequestViewProps {
  filterId: string
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: ICompoundRequestArgs
}

export const CompoundRequestView = ({
  filterId,
  isFilterActive,
  filterExpression,
}: ICompoundRequestViewProps): ReactElement => {
  const { problemGroups } = functionPanelStore
  const approx: string = filterExpression['approx'] || approxOptions[2]
  const state: string = filterExpression['state'] || 'current'
  const request = filterExpression['request']

  return (
    <div
      className={cn('text-14 pb-4 pl-5', {
        'bg-blue-tertiary': isFilterActive,
      })}
    >
      <div className="mt-4">
        <div className="px-4 text-grey-blue">Approx</div>

        <div className="pl-4 py-1 pt-2">{approx}</div>
      </div>

      <div className="mt-2">
        <div className="px-4 text-grey-blue">State</div>

        <div className="pl-4 py-1 pt-2">{state}</div>
      </div>

      <div className="flex flex-wrap mt-2">
        {request.map(([reqNumber, reqCondition], idx) => (
          <div key={filterId + idx} className="pb-2">
            <div className="px-4">
              <span className="text-grey-blue">Scenario</span>

              <span className="ml-1">{`[${reqNumber}]`}</span>
            </div>

            {problemGroups.map((group, idx) => (
              <div
                className={cn('flex items-center pl-4 py-1', {
                  'pt-2': idx === 0,
                })}
                key={filterId + group + idx}
              >
                <span>{group}</span>

                <span className="ml-1 text-grey-blue">
                  {getScenarioValue(group, Object.entries(reqCondition))}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
