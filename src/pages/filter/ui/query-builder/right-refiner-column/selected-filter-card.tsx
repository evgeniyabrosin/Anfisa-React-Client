import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { StatListType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useToggle } from '@core/hooks/use-toggle'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import {
  TCondition,
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { EnumFilter } from './enum-filter'
import { FuncFilter } from './func-filter'
import { ModalOptions } from './modal-options'
import { NumericFilter } from './numeric-filter'
import { IHandleRemoveFilter } from './query-results'

interface SelectedFilterCardProps {
  filterId: string
  filterCondition: TCondition
  handleRemoveFilter: ({
    filterId,
    subFilterIdx,
    filterType,
  }: IHandleRemoveFilter) => void
}

export const SelectedFilterCard = observer(
  ({
    filterId,
    filterCondition,
    handleRemoveFilter,
  }: SelectedFilterCardProps): ReactElement => {
    const filterType: string = filterCondition[0]
    const filterName: string = filterCondition[1]
    const filterContent: string[] = filterCondition[3]!
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

      const selectedGroupItem = datasetStore.dsStat['stat-list'].find(
        (filter: StatListType) => filter.name === filterName,
      )

      filterStore.setSelectedGroupItem(selectedGroupItem)
    }

    return (
      <>
        <div
          className={cn(
            'relative flex justify-between items-center border-b border-grey-light py-4 pl-3 pr-0.5 cursor-pointer',
            isFilterActive && 'bg-blue-light',
          )}
          onClick={handleOpenFilter}
        >
          <div
            className="flex"
            onClick={(event: React.MouseEvent) =>
              toggleFilterContentVisibility(event)
            }
          >
            <Icon
              name="Arrow"
              className={cn(
                'text-grey-blue transform transition-transform mr-1',
                isFilterContentVisible ? 'rotate-90' : '-rotate-90',
              )}
            />

            <div className="leading-16px">{filterName}</div>
          </div>

          <Icon
            name="Options"
            className="cursor-pointer text-blue-bright flex justify-self-end"
            stroke={false}
            onClick={(event: React.MouseEvent) =>
              toggleModalOptionsVisibility(event)
            }
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
            filterId={filterId}
            filterName={filterName}
            isFilterActive={isFilterActive}
            numericExpression={filterCondition[2] as TNumericConditionBounds}
            handleRemoveFilter={() =>
              handleRemoveFilter({
                filterId,
                subFilterIdx: 0,
                filterType,
              })
            }
          />
        )}

        {isFilterContentVisible && filterType === FilterKindEnum.Enum && (
          <EnumFilter
            filterId={filterId}
            isFilterActive={isFilterActive}
            filterContent={filterContent}
            handleRemoveFilter={handleRemoveFilter}
            filterType={filterType}
          />
        )}

        {isFilterContentVisible && filterType === FilterKindEnum.Func && (
          <FuncFilter
            filterId={filterId}
            filterName={filterName}
            isFilterActive={isFilterActive}
            filterContent={filterContent}
            filterExpression={filterExpression}
            handleRemoveFilter={handleRemoveFilter}
            filterType={filterType}
          />
        )}
      </>
    )
  },
)
