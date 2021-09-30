import { useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { QueryBuilderSubgroupChart } from './query-builder-subgroup-chart'

interface IProps {
  subGroupItem: StatList
  isModal?: boolean
  groupName: string
}

export const QueryBuilderSubgroupItem = observer(
  ({ subGroupItem, isModal, groupName }: IProps) => {
    const [isVisibleSubGroupItem, setIsVisibleSubGroupItem] = useState(true)

    const expandContent = () => {
      setIsVisibleSubGroupItem(prev => !prev)
    }

    const addSelectedGroup = () => {
      const filterGroup = [groupName, subGroupItem.name, subGroupItem.variants]

      dtreeStore.addSelectedGroup(filterGroup)
    }

    const handleModal = (group: StatList) => {
      addSelectedGroup()
      dtreeStore.closeModalAttribute()

      group.variants
        ? dtreeStore.openModalSelectFilter(groupName)
        : dtreeStore.openModalSelectNumbers(groupName)
    }

    return (
      <div key={subGroupItem.name} className="pl-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              isModal ? handleModal(subGroupItem) : expandContent()
            }}
          >
            <Icon
              name="Add"
              stroke={false}
              className="-mt-0.5"
              onClick={() => {
                isModal ? handleModal(subGroupItem) : expandContent()
              }}
            />

            <span
              className={cn('text-14 ml-1.5', {
                'text-black': !isVisibleSubGroupItem,
                'text-grey-blue': !isVisibleSubGroupItem && !isModal,
                'text-white': isVisibleSubGroupItem && !isModal,
                'hover:text-white': !isModal,
                'hover:text-blue-dark': isModal,
                'text-blue-dark': isModal && isVisibleSubGroupItem,
              })}
            >
              {subGroupItem.name}
            </span>
          </div>
        </div>

        {isVisibleSubGroupItem &&
          !isModal &&
          subGroupItem.variants &&
          subGroupItem.variants.length > 0 && (
            <QueryBuilderSubgroupChart variants={subGroupItem.variants} />
          )}
        {isVisibleSubGroupItem && !isModal && subGroupItem.max > 0 && (
          <QueryBuilderSubgroupChart histogram={subGroupItem.histogram} />
        )}
      </div>
    )
  },
)
