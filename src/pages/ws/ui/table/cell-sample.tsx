import { ReactElement } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import zoneStore from '@store/ws/zone'
import { IQualities } from './cell-samples'
import { ModalTooltip } from './modal-tooltip'

interface ICellSamplesProps {
  qualities: IQualities
  sample: string
  samplesAmount: number
  index: number
}

export const CellSample = ({
  qualities,
  sample,
  samplesAmount,
  index,
}: ICellSamplesProps): ReactElement => {
  const genotype: string = qualities[sample].genotype
  const quality: number = qualities[sample].g_quality

  const [isTooltipVisible, showTooltip, hideTooltip] = useToggle()

  const isTruncated = qualities[sample].genotype.length > 10

  const shouldTooltipBeVisible =
    isTooltipVisible && isTruncated && samplesAmount < 4

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      key={sample}
      className={cn('relative w-1/3 px-4 py-4', {
        'bg-orange-light': zoneStore.isFather && index === 2,
        'bg-yellow-light': zoneStore.isMother && index === 1,
        'bg-purple-light': zoneStore.isProband && index === 0,
      })}
    >
      <div>{sample}</div>

      <div className="truncate">{genotype}</div>

      <div>{quality}</div>

      {shouldTooltipBeVisible && (
        <ModalTooltip>
          <div className="flex flex-wrap justify-start">
            <div>{sample}</div>

            <div className="w-full">{genotype}</div>

            <div>{quality}</div>
          </div>
        </ModalTooltip>
      )}
    </div>
  )
}
