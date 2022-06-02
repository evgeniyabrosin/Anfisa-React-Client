import { FC, useRef } from 'react'
import cn, { Argument } from 'classnames'
import Tooltip from 'rc-tooltip'

import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'
import { XLBage } from '@pages/main/components/sidebar/datasets-list/components/dataset-bage'

interface IDsNameProps {
  dsName: any
  kind: string | null
  isActive: boolean
  isActiveParent: boolean
  isChildrenVisible?: boolean
  className?: Argument
}

export const DatasetName: FC<IDsNameProps> = ({
  dsName,
  kind,
  isActive,
  isActiveParent,
  isChildrenVisible,
  className,
}) => {
  const datasetRef = useRef<any>(null)

  const isXL = kind?.toLocaleLowerCase() === 'xl'

  const name = isXL && /^xl_.*/i.test(dsName) ? dsName.substring(3) : dsName

  const { x = 0, width = 0 } =
    datasetRef?.current?.getBoundingClientRect() || {}

  const hasTooltip = width + x > 230

  const fontColor = kind === null ? 'text-grey-blue' : 'text-white'
  const fontWeight = isXL
    ? 'font-bold'
    : isActive || isActiveParent
    ? 'font-medium'
    : ''

  return (
    <>
      {isXL && <XLBage isActive={isActive} />}

      <Tooltip
        overlay={dsName}
        trigger={hasTooltip ? ['hover'] : []}
        placement="right"
      >
        <div
          ref={datasetRef}
          className={cn(
            'text-sm leading-18px relative ml-2 pr-4',
            fontColor,
            fontWeight,
            {
              truncate: !isChildrenVisible,
              'py-2': !kind,
            },
            className,
          )}
          data-testid={FilterDatasetDataCy.datasetsListElem}
        >
          {name}
        </div>
      </Tooltip>
    </>
  )
}
