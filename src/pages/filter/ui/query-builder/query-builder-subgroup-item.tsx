import { useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { QueryBuilderSubgroupChart } from './query-builder-subgroup-chart'

type Props = {
  subGroupItem: StatList
  isModal?: boolean
  groupName: string
}

export const QueryBuilderSubgroupItem = observer(
  ({ subGroupItem, isModal, groupName }: Props) => {
    const [isVisibleSubGroupItem, setIsVisibleSubGroupItem] = useState(true)

    const expandContent = () => {
      setIsVisibleSubGroupItem(prev => !prev)
    }

    const addSelectedGroup = () => {
      const filterGroup = [groupName, subGroupItem.name, subGroupItem.variants]

      dtreeStore.addSelectedGroup(filterGroup)
    }

    const handleModal = () => {
      addSelectedGroup()
      dtreeStore.closeModalAttribute()
      dtreeStore.openModalSelectFilter()
    }

    return (
      <div key={subGroupItem.name} className="pl-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              isModal ? handleModal() : expandContent()
            }}
          >
            <Icon
              name="Add"
              stroke={false}
              className="-mt-0.5"
              onClick={() => {
                isModal ? handleModal() : expandContent()
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
      </div>
    )
  },
)
