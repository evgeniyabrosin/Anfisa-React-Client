import { ReactElement } from 'react'
import cn from 'classnames'

import { approxOptions } from '@core/approxOptions'
import { ICompoundHetArgs } from '@service-providers/common/common.interface'

interface ICompoundHetViewProps {
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: ICompoundHetArgs
}

export const CompoundHetView = ({
  isFilterActive,
  filterExpression,
}: ICompoundHetViewProps): ReactElement => {
  const approx: string = filterExpression['approx'] || approxOptions[2]
  const state: string = 'current'

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

      <div className="mt-2">
        <div className="px-4 text-grey-blue">Proband</div>

        <div className="pl-4 py-1 pt-2">True</div>
      </div>
    </div>
  )
}
