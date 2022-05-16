import { ReactElement } from 'react'
import cn from 'classnames'

import { DefaultProblemGroup } from '@core/enum/default-problem-group-enum'
import datasetStore from '@store/dataset/dataset'
import { IInheritanceModeArgs } from '@service-providers/common/common.interface'

interface IInheritanceModeViewProps {
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: IInheritanceModeArgs
}

export const InheritanceModeView = ({
  isFilterActive,
  filterContent,
  filterExpression,
}: IInheritanceModeViewProps): ReactElement => {
  const isProblemGroupExists = filterExpression['problem_group']

  return (
    <div
      className={cn('text-14 pb-4 pl-5', {
        'bg-blue-tertiary': isFilterActive,
      })}
    >
      <div className="mt-4">
        <div className="px-4 text-grey-blue">Problem group</div>

        {isProblemGroupExists ? (
          filterExpression['problem_group'].map((subFilterName, idx) => (
            <div
              className={cn('pl-4 py-1', {
                'pt-2': idx === 0,
              })}
              key={subFilterName}
            >
              {subFilterName}
            </div>
          ))
        ) : (
          <div className="pl-4 py-1 pt-2">
            {datasetStore.isXL
              ? DefaultProblemGroup.HG002
              : DefaultProblemGroup.NA24385}
          </div>
        )}
      </div>

      <div className="mt-2">
        <div className="px-4 text-grey-blue">Inheritance type</div>

        {filterContent.map((subFilterName, idx) => (
          <div
            className={cn('pl-4 py-1', {
              'pt-2': idx === 0,
            })}
            key={subFilterName}
          >
            {subFilterName}
          </div>
        ))}
      </div>
    </div>
  )
}
