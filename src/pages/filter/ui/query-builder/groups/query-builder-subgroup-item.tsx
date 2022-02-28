import { useState } from 'react'
import cn from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { FnLabel } from '@components/fn-label'
import { GlbPagesNames } from '@glb/glb-names'
import { QueryBuilderSubgroupChart } from './chart/query-builder-subgroup-chart'

interface IProps {
  subGroupItem: StatList
  isModal?: boolean
  groupName: string
}

export const QueryBuilderSubgroupItem = observer(
  ({ subGroupItem, isModal, groupName }: IProps) => {
    const [isVisibleSubGroupItem, setIsVisibleSubGroupItem] = useState(true)

    const [, writeScrollPosition] = useScrollPosition({
      elem: '#attributes-container',
      storageId: 'attributesModalScrollPos',
    })

    const expandContent = () => {
      setIsVisibleSubGroupItem(prev => !prev)
    }

    const addSelectedGroup = () => {
      const filterGroup = [groupName, subGroupItem.name, subGroupItem.variants]

      dtreeStore.addSelectedGroup(filterGroup)
    }

    const openAttrListForDtree = (group: StatList) => {
      const source = isModal ? ModalSources.TreeStep : ModalSources.TreeStat

      writeScrollPosition()
      addSelectedGroup()
      dtreeStore.closeModalAttribute()

      if (group.kind === FilterKindEnum.Enum) {
        dtreeStore.openModalSelectFilter(group.name, source)
      }

      if (group.kind === FilterKindEnum.Numeric) {
        dtreeStore.openModalSelectNumbers(group.name, source)
      }

      const { activeStepIndex } = activeStepStore

      if (group.kind === FilterKindEnum.Func) {
        group.name === FuncStepTypesEnum.InheritanceMode &&
          dtreeStore.openModalSelectInheritanceMode(
            group.name,
            activeStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.CustomInheritanceMode &&
          dtreeStore.openModalSelectCustomInheritanceMode(
            group.name,
            activeStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundHet &&
          dtreeStore.openModalSelectCompoundHet(
            group.name,
            activeStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundRequest &&
          dtreeStore.openModalSelectCompoundRequest(
            group.name,
            activeStepIndex,
            source,
          )

        group.name === FuncStepTypesEnum.GeneRegion &&
          dtreeStore.openModalSelectGeneRegion(
            group.name,
            activeStepIndex,
            source,
          )
      }
    }

    const handleAttrClick = (group: StatList) => {
      const page = filterStore.method

      if (page === GlbPagesNames.Filter) {
        openAttrListForDtree(group)
      } else if (page === GlbPagesNames.Refiner) {
        filterStore.setSelectedGroupItem(group)
      }
    }

    return (
      <div className="pl-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center cursor-pointer">
            <Icon
              name="Add"
              fill={true}
              stroke={false}
              className="-mt-0.5 mr-1.5 text-blue-bright hover:text-blue-dark"
              onClick={() => handleAttrClick(subGroupItem)}
            />

            {subGroupItem.kind === FilterKindEnum.Func && (
              <FnLabel subGroup={true} />
            )}

            <span
              className={cn('text-14', {
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
              data-testid={DecisionTreesResultsDataCy.graphHeaders}
            >
              {subGroupItem.name}
            </span>
          </div>
        </div>

        {/* TODO: if varaintas length > 100  add antoher visualisation*/}
        {isVisibleSubGroupItem &&
          !isModal &&
          subGroupItem.variants &&
          subGroupItem.variants.length > 0 &&
          subGroupItem.variants.length < 100 && (
            <QueryBuilderSubgroupChart variants={toJS(subGroupItem.variants)} />
          )}
        {isVisibleSubGroupItem && !isModal && subGroupItem.max > 0 && (
          <QueryBuilderSubgroupChart histogram={toJS(subGroupItem.histogram)} />
        )}
      </div>
    )
  },
)
