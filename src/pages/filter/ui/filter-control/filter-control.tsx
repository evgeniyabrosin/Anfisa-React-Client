import { Fragment, ReactElement } from 'react'
import { useHistory } from 'react-router'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Icon } from '@ui/icon'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { GlbPagesNames } from '@glb/glb-names'
import { moveActionHistory } from '@utils/moveActionHistory'
import {
  FilterControlOptions,
  FilterControlOptionsNames,
} from './filter-control.const'
import { FilterControlQueryBuilder } from './filter-control-query-builder/filter-control-query-builder'
import { FilterControlRefiner } from './filter-control-refiner/filter-control-refiner'

export const FilterControl = observer((): ReactElement => {
  const isFirstActionHistoryIndex = dtreeStore.actionHistoryIndex === 0

  const isLastActionHistoryIndex =
    dtreeStore.actionHistoryIndex + 1 === toJS(dtreeStore.actionHistory).length

  const isUndoLocked = isFirstActionHistoryIndex
  const isRedoLocked = isLastActionHistoryIndex
  const history = useHistory()
  const handleClose = () => {
    datasetStore.applyMemorizedConditions()
    filterStore.applyMemorizedFilters()
    datasetStore.fetchWsListAsync()
    history.goBack()
  }
  const params = useParams()
  const dsName = params.get('ds') || ''
  const page: FilterControlOptions = filterStore.method as FilterControlOptions
  const pageName: FilterControlOptionsNames = FilterControlOptionsNames[page]

  const goToPage = (name: FilterControlOptions) => {
    const route = getPageRoute(name)

    filterStore.setMethod(name)

    history.push(`${route}?ds=${dsName}`)
  }

  return (
    <Fragment>
      <div className="flex flex-wrap justify-end bg-blue-dark pr-6 pb-4 pl-6">
        <div className="flex items-center w-full mt-5">
          {page === GlbPagesNames.Refiner ? (
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
              options={FilterControlOptions}
              value={pageName}
              onSelect={args => {
                goToPage(args.value as FilterControlOptions)
              }}
            />

            {page === GlbPagesNames.Filter && (
              <Button
                text="Text editor"
                className="ml-2"
                variant={'secondary-dark'}
                onClick={() => dtreeStore.openModalTextEditor()}
                dataTestId={DecisionTreesMenuDataCy.textEditor}
              />
            )}
            {/* Temporarily removed in Refiner page */}
            {page === GlbPagesNames.Filter && (
              <>
                <Button
                  text="Undo"
                  className="ml-2"
                  variant={'secondary-dark'}
                  disabled={isUndoLocked}
                  onClick={() => moveActionHistory(-1)}
                />
                <Button
                  text="Redo"
                  className="ml-2"
                  variant={'secondary-dark'}
                  disabled={isRedoLocked}
                  onClick={() => moveActionHistory(1)}
                />
              </>
            )}
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
})
