import { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { PointCount } from '@service-providers/decision-trees'

interface INextStepCountProps {
  className?: string
  isXl: boolean
  prefix?: ReactNode
  pointCount: PointCount
  isActive?: boolean
}

export const StepCount = ({
  className,
  isXl,
  prefix,
  pointCount,
  isActive,
}: INextStepCountProps): ReactElement => {
  if (!pointCount) {
    return <div className={className}>{prefix}...</div>
  }
  const count = pointCount[isXl ? 0 : 1]

  return (
    <div className={cn('text-right', className)}>
      <span className={isActive ? 'border-b-2 border-dashed' : undefined}>
        {prefix}
        {formatNumber(count)}
      </span>
      {!isXl && typeof count === 'number' && count > 0 && (
        <div className="text-xs font-normal whitespace-nowrap">
          {t('dtree.variantsCount', { value: pointCount[0] })}
        </div>
      )}
    </div>
  )
}
