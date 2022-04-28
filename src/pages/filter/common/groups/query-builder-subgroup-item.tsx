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
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { GlbPagesNames } from '@glb/glb-names'
import { AttributeKinds, TPropertyStatus } from '@service-providers/common'
import { TQueryBuilderAttribute } from '@utils/query-builder'
import modalFiltersStore from '../../dtree/components/modals/components/modal-enum/modal-enum.store'
import modalsVisibilityStore from '../../dtree/components/modals/modals-visibility-store'
import { QueryBuilderSubgroupChart } from './chart/query-builder-subgroup-chart'

interface IProps {
  subGroupItem: TQueryBuilderAttribute
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
      modalsVisibilityStore.closeModalAttribute()

      if (group.kind === AttributeKinds.ENUM) {
        modalsVisibilityStore.openModalEnum(group.name, undefined, source)
        modalFiltersStore.setCurrentGroupSubKind(group['sub-kind'])
      }

      if (group.kind === AttributeKinds.NUMERIC) {
        modalsVisibilityStore.openModalNumbers(group.name, undefined, source)
      }

      if (group.kind === AttributeKinds.FUNC) {
        group.name === FuncStepTypesEnum.InheritanceMode &&
          modalsVisibilityStore.openModalInheritanceMode(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.CustomInheritanceMode &&
          modalsVisibilityStore.openModalCustomInheritanceMode(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundHet &&
          modalsVisibilityStore.openModalCompoundHet(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.CompoundRequest &&
          modalsVisibilityStore.openModalCompoundRequest(
            group.name,
            undefined,
            source,
          )

        group.name === FuncStepTypesEnum.GeneRegion &&
          modalsVisibilityStore.openModalGeneRegion(
            group.name,
            undefined,
            source,
          )
      }
    }

    const { filterChangeIndicator } = dtreeStore

    useEffect(() => {
      if (filterChangeIndicator === -1) setIsVisibleSubGroupItem(true)
    }, [filterChangeIndicator])

    const handleAttrClick = (group: TPropertyStatus) => {
      const page = filterStore.method

      if (page === GlbPagesNames.Dtree) {
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
            {subGroupItem.power && (
              <div className="w-5 pr-0.5 mr-0.5 inline-flex align-center justify-center">
                <PredictionPowerIndicator
                  value={subGroupItem.power.value}
                  comment={subGroupItem.power.comment}
                />
              </div>
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
