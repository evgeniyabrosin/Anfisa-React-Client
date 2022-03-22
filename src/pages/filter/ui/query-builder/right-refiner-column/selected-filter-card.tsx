import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'
import {
  TCondition,
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { EnumFilter } from './enum-filter'
import { FuncFilter } from './func-filter'
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
    const [isOpen, open, close] = useToggle(true)

    const filterType: string = filterCondition[0]
    const filterName: string = filterCondition[1]
    const filterContent: string[] = filterCondition[3]!
    const filterExpression: TFuncArgs = filterCondition[4]!

    return (
      <div>
        <div
          className="flex items-center border-b border-grey-light p-4 cursor-pointer"
          onClick={isOpen ? close : open}
        >
          <span className="leading-16px">{filterName}</span>

          <Icon
            name="Arrow"
            className={cn(
              'text-blue-bright ml-auto transform transition-transform',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          />
        </div>

        {isOpen && filterType === FilterKindEnum.Numeric && (
          <NumericFilter
            filterId={filterId}
            filterName={filterName}
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

        {isOpen && filterType === FilterKindEnum.Enum && (
          <EnumFilter
            filterId={filterId}
            filterName={filterName}
            filterContent={filterContent}
            handleRemoveFilter={handleRemoveFilter}
            filterType={filterType}
          />
        )}

        {isOpen && filterType === FilterKindEnum.Func && (
          <FuncFilter
            filterId={filterId}
            filterName={filterName}
            filterContent={filterContent}
            filterExpression={filterExpression}
            handleRemoveFilter={handleRemoveFilter}
            filterType={filterType}
          />
        )}
      </div>
    )
  },
)
