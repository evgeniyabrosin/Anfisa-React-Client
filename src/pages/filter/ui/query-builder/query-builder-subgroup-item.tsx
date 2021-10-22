import { useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
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

    const handleAttrClick = (group: StatList) => {
      const source = isModal ? ModalSources.TreeStep : ModalSources.TreeStat

      addSelectedGroup()
      dtreeStore.closeModalAttribute()

      if (group.kind === 'enum') {
        dtreeStore.openModalSelectFilter(group.name, source)
      }

      if (group.kind === 'numeric') {
        dtreeStore.openModalSelectNumbers(group.name, source)
      }

      if (group.kind === 'func') {
        group.name === FuncStepTypesEnum.InheritanceMode &&
          dtreeStore.openModalSelectInheritanceMode(
            group.name,
            dtreeStore.currentStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.CustomInheritanceMode &&
          dtreeStore.openModalSelectCustomInheritanceMode(
            group.name,
            dtreeStore.currentStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundHet &&
          dtreeStore.openModalSelectCompoundHet(
            group.name,
            dtreeStore.currentStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundRequest &&
          dtreeStore.openModalSelectCompoundRequest(
            group.name,
            dtreeStore.currentStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.GeneRegion &&
          dtreeStore.openModalSelectGeneRegion(
            group.name,
            dtreeStore.currentStepIndex,
            source,
          )
      }
    }

    return (
      <div key={subGroupItem.name} className="pl-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center cursor-pointer">
            <Icon
              name="Add"
              fill={true}
              stroke={false}
              className="-mt-0.5 text-blue-bright hover:text-blue-dark"
              onClick={() => handleAttrClick(subGroupItem)}
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
              onClick={() => {
                isModal ? handleAttrClick(subGroupItem) : expandContent()
              }}
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
