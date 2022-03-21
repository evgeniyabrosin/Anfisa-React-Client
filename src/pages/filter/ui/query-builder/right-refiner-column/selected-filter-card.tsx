import { ReactElement } from 'react'
import cn from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useToggle } from '@core/hooks/use-toggle'
import filterStore, { IFilter } from '@store/filter'
import { Icon } from '@ui/icon'
import {
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { EnumFilter } from './enum-filter'
import { FuncFilter } from './func-filter'
import { NumericFilter } from './numeric-filter'
import { IHandleRemoveFilter } from './query-results'
interface SelectedFilterCardProps {
  filter: IFilter
  handleRemoveFilter: ({
    filterId,
    filterName,
    subFilterName,
    subFilterIdx,
    filterType,
  }: IHandleRemoveFilter) => void
}

export const SelectedFilterCard = observer(
  ({ filter, handleRemoveFilter }: SelectedFilterCardProps): ReactElement => {
    const [isOpen, open, close] = useToggle(true)

    const filterType: string = filter.condition[0]
    const filterName: string = filter.condition[1]
    const filterContent: string[] = filter.condition[3]!
    const filterId: string = filter.filterId
    const filterExpression: TFuncArgs = filter.condition[4]!

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
            numericExpression={filter.condition[2] as TNumericConditionBounds}
            handleRemoveFilter={() =>
              handleRemoveFilter({
                filterId,
                filterName,
                subFilterName: filterName,
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
