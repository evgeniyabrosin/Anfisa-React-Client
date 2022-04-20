import { useEffect, useState } from 'react'
import cn from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { FnLabel } from '@components/fn-label'
import { GlbPagesNames } from '@glb/glb-names'
import { AttributeKinds, TPropertyStatus } from '@service-providers/common'
import dtreeModalStore from '../../../modals.store'
import modalFiltersStore from '../../modal-edit/components/modal-enum/modal-enum.store'
import { QueryBuilderSubgroupChart } from './chart/query-builder-subgroup-chart'

interface IProps {
  subGroupItem: TPropertyStatus
  isModal?: boolean
  groupName: string
}

export const QueryBuilderSubgroupItem = observer(
  ({ subGroupItem, isModal, groupName }: IProps) => {
    const [isVisibleSubGroupItem, setIsVisibleSubGroupItem] = useState(false)

    const [, writeScrollPosition] = useScrollPosition({
      elem: '#attributes-container',
      storageId: 'attributesModalScrollPos',
    })

    const expandContent = () => {
      setIsVisibleSubGroupItem(prev => !prev)
    }

    const addSelectedGroup = () => {
      const filterGroup = [
        groupName,
        subGroupItem.name /*, subGroupItem.variants*/,
      ]

      dtreeStore.addSelectedGroup(filterGroup)
    }

    const openAttrListForDtree = (group: TPropertyStatus) => {
      const source = isModal ? ModalSources.TreeStep : ModalSources.TreeStat

      writeScrollPosition()
      addSelectedGroup()
      dtreeModalStore.closeModalAttribute()

      if (group.kind === AttributeKinds.ENUM) {
        dtreeModalStore.openModalEnum(group.name, undefined, source)
        modalFiltersStore.setCurrentGroupSubKind(group['sub-kind'])
      }

      if (group.kind === AttributeKinds.NUMERIC) {
        dtreeModalStore.openModalNumbers(group.name, undefined, source)
      }

      if (group.kind === AttributeKinds.FUNC) {
        group.name === FuncStepTypesEnum.InheritanceMode &&
          dtreeModalStore.openModalInheritanceMode(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.CustomInheritanceMode &&
          dtreeModalStore.openModalCustomInheritanceMode(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundHet &&
          dtreeModalStore.openModalCompoundHet(group.name, undefined, source)

        group.name === FuncStepTypesEnum.CompoundRequest &&
          dtreeModalStore.openModalCompoundRequest(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.GeneRegion &&
          dtreeModalStore.openModalGeneRegion(group.name, undefined, source)
      }
    }

    const { filterChangeIndicator } = dtreeStore

    useEffect(() => {
      if (filterChangeIndicator === -1) setIsVisibleSubGroupItem(true)
    }, [filterChangeIndicator])

    const handleAttrClick = (group: TPropertyStatus) => {
      const page = filterStore.method

      if (page === GlbPagesNames.Filter) {
        openAttrListForDtree(group)
      } else if (page === GlbPagesNames.Refiner) {
        filterStore.setAttributeToAdd(group.name)
      }
    }

    /* TODO: if variants length > 100  add another visualisation */
    const isChartVisible =
      isVisibleSubGroupItem &&
      !isModal &&
      ((subGroupItem.kind === AttributeKinds.ENUM &&
        subGroupItem.variants &&
        subGroupItem.variants.length > 0 &&
        subGroupItem.variants.length < 100) ||
        (subGroupItem.kind === AttributeKinds.NUMERIC &&
          subGroupItem.histogram &&
          subGroupItem.histogram.length > 0))

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

            {subGroupItem.kind === AttributeKinds.FUNC && (
              <FnLabel subGroup={true} />
            )}

            <span
              className={cn('text-14', {
                'text-black': isModal && !isVisibleSubGroupItem,
                'text-blue-dark': isModal && isVisibleSubGroupItem,
                'text-white': !isModal,
                'hover:text-white': !isModal,
                'hover:text-blue-dark': isModal,
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
        {isChartVisible && (
          <QueryBuilderSubgroupChart
            // TODO: StatList -> TPropertyStatus refactoring
            subGroupItem={toJS(subGroupItem) as TPropertyStatus}
          />
        )}
      </div>
    )
  },
)
