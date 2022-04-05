import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { ExpandContentButton } from '../ui/expand-content-button'
import { QueryBuilderSubgroupItem } from './query-builder-subgroup-item'

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
      <div>
        <div
          onClick={onClick}
          className={cn(
            'flex items-center justify-between mb-3 text-16 cursor-pointer',
            {
              'text-black': !isVisibleSubGroup,
              'text-grey-blue': !isVisibleSubGroup && !isModal,
              'text-white': isVisibleSubGroup && !isModal,
              'hover:text-white': !isModal,
              'hover:text-blue-dark': isModal,
              'text-blue-dark': isModal && isVisibleSubGroup,
            },
          )}
        >
          <span data-testid={DecisionTreesResultsDataCy.groupGraphHeaders}>
            {groupName}
          </span>

          <ExpandContentButton
            isVisible={isVisibleSubGroup}
            isModal={isModal}
          />
        </div>

        {isVisibleSubGroup &&
          subGroupData.map(subGroupItem => (
            <QueryBuilderSubgroupItem
              subGroupItem={subGroupItem}
              key={subGroupItem.name}
              isModal={isModal}
              groupName={groupName}
            />
          ))}
      </div>
    )
  },
)
