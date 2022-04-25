import { FC } from 'react'
import cn from 'classnames'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { CircleDivider } from '@ui/divider'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

interface IVariantsCountProps {
  variantCounts?: number | null
  transcriptsCounts?: number | null
  dnaVariantsCounts?: number | null
  showVariants?: boolean
  showTranscripts?: boolean
  showDnaVariants?: boolean
}

export const VariantsCount: FC<IVariantsCountProps> = ({
  variantCounts,
  transcriptsCounts,
  dnaVariantsCounts,
  showDnaVariants = true,
  showVariants = true,
  showTranscripts = true,
  children,
}) => {
  return (
    <div className="text-white flex-grow flex justify-end mr-6 items-center">
      {showVariants && (
        <span
          className={cn('text-12 leading-14px text-white ml-auto', {
            'mr-2': showDnaVariants || showTranscripts,
            'mr-6': !showDnaVariants && !showTranscripts && children,
          })}
          data-testid={MainTableDataCy.numVariants}
        >
          {t('filter.variants', {
            all: formatNumber(variantCounts),
          })}
        </span>
      )}

      {showTranscripts && (
        <span
          className={cn('text-12 leading-14px text-white border-blue-lighter', {
            'border-l-2 pl-2': showVariants,
            'mr-3': showDnaVariants,
          })}
        >
          {t('filter.transcripts', {
            all: formatNumber(transcriptsCounts),
          })}
        </span>
      )}

      {(showTranscripts || showVariants) && showDnaVariants && (
        <CircleDivider size="4px" />
      )}

      {showDnaVariants && (
        <span
          className={cn('text-12 leading-14px text-grey-blue', {
            'ml-3': showTranscripts || showDnaVariants,
            'mr-6': children,
          })}
        >
          {t('filter.transcribedVariants', {
            all: formatNumber(dnaVariantsCounts),
          })}
        </span>
      )}
      {children}
    </div>
  )
}
