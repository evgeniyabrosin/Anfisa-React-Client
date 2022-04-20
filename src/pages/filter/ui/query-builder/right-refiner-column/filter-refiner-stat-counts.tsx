import { ReactElement } from 'react'
import cn from 'classnames'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { TFilteringStatCounts } from '@service-providers/common'

export interface IFilterRefinerStatCounts {
  className?: string
  counts: TFilteringStatCounts | undefined
}

export const FilterRefinerStatCounts = ({
  className,
  counts,
}: IFilterRefinerStatCounts): ReactElement => {
  return (
    <div
      className={cn(
        'flex flex-wrap text-12 leading-14px font-medium',
        className,
      )}
    >
      <span>
        {t('filter.variants', {
          all: formatNumber(counts?.variants),
        })}
      </span>
      {counts && counts.transcribedVariants > 0 && (
        <span className="border-l-2 border-grey-disabled ml-2 pl-2">
          {t('filter.transcribedVariants', {
            all: formatNumber(counts.transcribedVariants),
          })}
        </span>
      )}
      {counts && counts.transcripts > 0 && (
        <span className="border-l-2 border-grey-disabled ml-2 pl-2">
          {t('filter.transcripts', {
            all: formatNumber(counts.variants),
          })}
        </span>
      )}
    </div>
  )
}
