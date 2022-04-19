import { ReactElement } from 'react'
import cn from 'classnames'

import { IGeneRegionArgs } from '@service-providers/common/common.interface'

interface IGeneRegionViewProps {
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: IGeneRegionArgs
}

export const GeneRegionView = ({
  isFilterActive,
  filterExpression,
}: IGeneRegionViewProps): ReactElement => (
  <div
    className={cn('text-14 pb-4 pl-5', {
      'bg-blue-tertiary': isFilterActive,
    })}
  >
    <div className="mt-4">
      <div className="px-4 text-grey-blue">Locus</div>

      <div className="pl-4 py-1 pt-2">{filterExpression['locus']}</div>
    </div>
  </div>
)
