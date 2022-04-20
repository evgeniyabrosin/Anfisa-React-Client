import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'
import { ConditionJoinMode } from '@service-providers/common'
import {
  TCondition,
  TFuncArgs,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { AllNotModeLabel } from '../../all-not-mode-label'
import { ConditionModalOptionsPopup } from './condition-modal-options-popup'
import { EnumFilter } from './enum-filter'
import { FuncFilter } from './func-filter'
import { NumericFilter } from './numeric-filter'

interface ISelectedFilterCardProps {
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
  condition: TCondition
}

export const SelectedFilterCard = observer(
  ({
    isActive,
    onSelect,
    onDelete,
    condition,
  }: ISelectedFilterCardProps): ReactElement => {
    // TODO: mobx warning for out of bounds read from condition
    //       not all of conditions have 3rd and 4th value
    const filterType: string = condition[0]
    const filterName: string = condition[1]
    const filterMode: ConditionJoinMode | undefined =
      filterType !== FilterKindEnum.Numeric
        ? (condition[2] as ConditionJoinMode)
        : undefined
    const filterContent: string[] = condition[3] || []
    const filterExpression: TFuncArgs = condition[4]!

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

    return (
      <>
        <div
          className={cn('relative flex flex-col px-3 cursor-pointer', {
            'bg-blue-tertiary': isActive,
          })}
          onClick={onSelect}
        >
          <div className="flex py-4 justify-between">
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
              className="cursor-pointer text-blue-bright"
              stroke={false}
              onClick={toggleModalOptionsVisibility}
            />

            {isModalOptionsVisible && (
              <ConditionModalOptionsPopup
                onClose={hideModalOptions}
                onDeleteCondition={onDelete}
                filterName={filterName}
              />
            )}
          </div>

          <div className="bg-grey-light h-px w-full" />
        </div>

        {isFilterContentVisible && filterType === FilterKindEnum.Numeric && (
          <NumericFilter
            filterName={filterName}
            isFilterActive={isActive}
            numericExpression={condition[2] as TNumericConditionBounds}
          />
        )}

        {isFilterContentVisible && filterType === FilterKindEnum.Enum && (
          <EnumFilter isFilterActive={isActive} filterContent={filterContent} />
        )}

        {isFilterContentVisible && filterType === FilterKindEnum.Func && (
          <FuncFilter
            filterName={filterName}
            isFilterActive={isActive}
            filterContent={filterContent}
            filterExpression={filterExpression}
          />
        )}
      </>
    )
  },
)
