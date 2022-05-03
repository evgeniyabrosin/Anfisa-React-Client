import { FC, useRef } from 'react'
import cn, { Argument } from 'classnames'
import Tooltip from 'rc-tooltip'

import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'
import { XLBage } from '@pages/main/ui/datasets-list/components/dataset-bage'

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

  const name =
    isXL && dsName.substring(0, 3).toLocaleLowerCase() === 'xl_'
      ? dsName.substring(3)
      : dsName

  const hasTooltip =
    datasetRef?.current?.getBoundingClientRect().width +
      datasetRef?.current?.getBoundingClientRect().x >
    230

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
            kind === null ? 'text-grey-blue' : 'text-white',
            'text-sm leading-18px relative ml-2 pr-4',
            {
              'font-bold': isXL,
              'font-medium': (isActive || isActiveParent) && !isXL,
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
