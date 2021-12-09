import { Fragment, ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Icon } from '@ui/icon'
import { moveActionHistory } from '@utils/moveActionHistory'
import { FilterControlQueryBuilder } from './filter-control-query-builder'
import { FilterControlRefiner } from './filter-control-refiner'

export const FilterControl = observer(
  (): ReactElement => {
    const isFirstActionHistoryIndex = dtreeStore.actionHistoryIndex === 0

    const isLastActionHistoryIndex =
      dtreeStore.actionHistoryIndex + 1 === dtreeStore.actionHistory.length

    const isUndoLocked = isFirstActionHistoryIndex
    const isRedoLocked = isLastActionHistoryIndex
    const history = useHistory()

    const handleClose = () => {
      history.push(`${Routes.Root}`)
    }

    return (
      <Fragment>
        <div className="flex flex-wrap justify-end bg-blue-dark pr-6 pb-4 pl-6">
          <div className="flex items-center w-full mt-5">
            {filterStore.method === 'Filter Refiner' ? (
              <FilterControlRefiner />
            ) : (
              <FilterControlQueryBuilder />
            )}
          </div>

          <div className="flex justify-between w-full mt-3">
            <div className="flex items-center">
              <span className="text-grey-blue text-14 font-bold mr-2">
                {t('filter.method')}
              </span>

              <DropDown
                options={[
                  FilterMethodEnum.DecisionTree,
                  FilterMethodEnum.Refiner,
                ]}
                value={filterStore.method}
                onSelect={args => {
                  filterStore.setMethod(args.value as FilterMethodEnum)
                  filterStore.resetActionName()
                }}
              />

              {filterStore.method === FilterMethodEnum.DecisionTree && (
                <Button
                  text="Text editor"
                  className="ml-2 hover:bg-blue-bright"
                  hasBackground={false}
                  onClick={() => dtreeStore.openModalTextEditor()}
                />
              )}
              <Button
                text="Undo"
                className="ml-2 hover:bg-blue-bright"
                hasBackground={false}
                disabled={isUndoLocked}
                onClick={() => moveActionHistory(-1)}
              />
              <Button
                text="Redo"
                className="ml-2 hover:bg-blue-bright"
                hasBackground={false}
                disabled={isRedoLocked}
                onClick={() => moveActionHistory(1)}
              />
            </div>
            <div className="flex flex-wrap">
              <Icon
                name="Close"
                className="text-white cursor-pointer"
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  },
)
