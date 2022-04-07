import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatListType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useToggle } from '@core/hooks/use-toggle'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import { ConditionJoinMode } from '@service-providers/common'
import {
  TCondition,
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { AllNotModeLabel } from '../../all-not-mode-label'
import { EnumFilter } from './enum-filter'
import { FuncFilter } from './func-filter'
import { ModalOptions } from './modal-options'
import { NumericFilter } from './numeric-filter'

interface ISelectedFilterCardProps {
  filterId: string
  filterCondition: TCondition
}

export const SelectedFilterCard = observer(
  ({ filterId, filterCondition }: ISelectedFilterCardProps): ReactElement => {
    const filterType: string = filterCondition[0]
    const filterName: string = filterCondition[1]
    const filterMode: ConditionJoinMode | undefined =
      filterType !== FilterKindEnum.Numeric
        ? (filterCondition[2] as ConditionJoinMode)
        : undefined
    const filterContent: string[] = filterCondition[3] || []
    const filterExpression: TFuncArgs = filterCondition[4]!

    const isFilterActive = filterId === filterStore.activeFilterId

    const [isFilterContentVisible, showFilterContent, hideFilterContent] =
      useToggle(true)

    const [isModalOptionsVisible, showModalOptions, hideModalOptions] =
      useToggle(false)

    const toggleFilterContentVisibility = (event: React.MouseEvent) => {
      event.stopPropagation()

      isFilterContentVisible ? hideFilterContent() : showFilterContent()
    }

    const toggleModalOptionsVisibility = (event: React.MouseEvent) => {
      event.stopPropagation()

      isModalOptionsVisible ? hideModalOptions() : showModalOptions()
    }

    const handleOpenFilter = () => {
      filterStore.setActiveFilterId(filterId)
      filterStore.setIsRedacorMode()
      filterStore.resetSelectedGroupItem()

      const selectedGroupItem = datasetStore.startDsStat['stat-list'].find(
        (filter: StatListType) => filter.name === filterName,
      )

      filterStore.setSelectedGroupItem(selectedGroupItem)
    }

    return (
      <>
        <div
          className={cn(
            'relative flex justify-between items-center border-b border-grey-light py-4 px-3 cursor-pointer',
            { 'bg-blue-tertiary': isFilterActive },
          )}
          onClick={handleOpenFilter}
        >
          <div className="flex" onClick={toggleFilterContentVisibility}>
            <Icon
              name="Arrow"
              className={cn(
                'text-grey-blue transform transition-transform mr-2',
                isFilterContentVisible ? 'rotate-90' : '-rotate-90',
              )}
            />

            <div className="leading-16px font-bold">{filterName}</div>

            <AllNotModeLabel
              isAllMode={filterMode === ConditionJoinMode.AND}
              isNotMode={filterMode === ConditionJoinMode.NOT}
            />
          </div>

          <Icon
            name="Options"
            className="cursor-pointer text-blue-bright flex justify-self-end"
            stroke={false}
            onClick={toggleModalOptionsVisibility}
          />

          {isModalOptionsVisible && (
            <ModalOptions
              closeModal={hideModalOptions}
              filterId={filterId}
              filterName={filterName}
            />
          )}
        </div>

        {isFilterContentVisible && filterType === FilterKindEnum.Numeric && (
          <NumericFilter
            filterName={filterName}
            isFilterActive={isFilterActive}
            numericExpression={filterCondition[2] as TNumericConditionBounds}
          />
        )}

        {isFilterContentVisible && filterType === FilterKindEnum.Enum && (
          <EnumFilter
            filterId={filterId}
            isFilterActive={isFilterActive}
            filterContent={filterContent}
          />
        )}

        {isFilterContentVisible && filterType === FilterKindEnum.Func && (
          <FuncFilter
            filterId={filterId}
            filterName={filterName}
            isFilterActive={isFilterActive}
            filterContent={filterContent}
            filterExpression={filterExpression}
          />
        )}
      </>
    )
  },
)
