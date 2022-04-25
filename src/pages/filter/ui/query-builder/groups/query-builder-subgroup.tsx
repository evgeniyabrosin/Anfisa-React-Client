import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { TPropertyStatus } from '@service-providers/common'
import { ExpandContentButton } from '../ui/expand-content-button'
import { QueryBuilderSubgroupItem } from './query-builder-subgroup-item'

interface IProps {
  groupName: string
  predictionPower: number | undefined
  subGroupData: TPropertyStatus[]
  isContentExpanded: boolean
  changeIndicator: number
  isModal?: boolean
}

export const QueryBuilderSubgroup = observer(
  ({
    groupName,
    predictionPower,
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
              'text-black': isModal && !isVisibleSubGroup,
              'text-blue-dark': isModal && isVisibleSubGroup,
              'text-grey-blue': !isModal && !isVisibleSubGroup,
              'text-white': !isModal && isVisibleSubGroup,
              'hover:text-white': !isModal,
              'hover:text-blue-dark': isModal,
            },
          )}
        >
          {predictionPower !== undefined && (
            <PredictionPowerIndicator
              className="mr-2"
              value={predictionPower}
            />
          )}
          <span
            data-testid={DecisionTreesResultsDataCy.groupGraphHeaders}
            className="flex-1"
          >
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
