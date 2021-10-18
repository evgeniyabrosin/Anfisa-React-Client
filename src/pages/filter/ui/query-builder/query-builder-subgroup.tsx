import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { DeferRender } from '@utils/deferRender'
import { QueryBuilderSubgroupItem } from './query-builder-subgroup-item'
import { ExpandContentButton } from './ui/expand-content-button'

interface IProps {
  groupName: string
  subGroupData: StatList[]
  isContentExpanded: boolean
  changeIndicator: number
  isModal?: boolean
}

export const QueryBuilderSubgroup = observer(
  ({
    groupName,
    subGroupData,
    isContentExpanded,
    changeIndicator,
    isModal,
  }: IProps) => {
    const [isVisibleSubGroup, setIsVisibleSubGroup] = useState(true)

    const expandContent = () => {
      setIsVisibleSubGroup(prev => !prev)
    }

    const onClick = useCallback(() => {
      expandContent()
    }, [])

    useEffect(() => {
      !isContentExpanded && setIsVisibleSubGroup(true)
      isContentExpanded && setIsVisibleSubGroup(false)
    }, [isContentExpanded, changeIndicator])

    return (
      <div key={groupName}>
        <div
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => onClick}
        >
          <span
            className={cn('text-16 font-500', {
              'text-black': !isVisibleSubGroup,
              'text-grey-blue': !isVisibleSubGroup && !isModal,
              'text-white': isVisibleSubGroup && !isModal,
              'hover:text-white': !isModal,
              'hover:text-blue-dark': isModal,
              'text-blue-dark': isModal && isVisibleSubGroup,
            })}
          >
            {groupName}
          </span>

          <ExpandContentButton
            isVisible={isVisibleSubGroup}
            isModal={isModal}
          />
        </div>

        {isVisibleSubGroup && (
          <DeferRender chunkSize={2}>
            {subGroupData.map(subGroupItem => (
              <QueryBuilderSubgroupItem
                subGroupItem={subGroupItem}
                key={Math.random()}
                isModal={isModal}
                groupName={groupName}
              />
            ))}
          </DeferRender>
        )}
      </div>
    )
  },
)
