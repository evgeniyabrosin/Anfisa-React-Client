import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Icon } from '@ui/icon'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { GlbPagesNames } from '@glb/glb-names'
import { moveActionHistory } from '@utils/moveActionHistory'
import { FilterControlDtree } from '../../dtree/components/filter-control-dtree/filter-control-dtree'
import modalsVisibilityStore from '../../dtree/components/modals/modals-visibility-store'
import { FilterControlRefiner } from '../../refiner/components/filter-control-refiner/filter-control-refiner'
import {
  FilterControlOptions,
  FilterControlOptionsNames,
} from './filter-control.const'

export const FilterControl = observer((): ReactElement => {
  const isFirstActionHistoryIndex = dtreeStore.actionHistoryIndex === 0

  const isLastActionHistoryIndex =
    dtreeStore.actionHistoryIndex + 1 === toJS(dtreeStore.actionHistory).length

  const isUndoLocked = isFirstActionHistoryIndex
  const isRedoLocked = isLastActionHistoryIndex
  const history = useHistory()

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
    <div className="flex flex-wrap justify-end bg-blue-dark pr-6 pb-4 pl-6">
      <div className="flex items-center w-full mt-5">
        {page === GlbPagesNames.Refiner ? (
          <FilterControlRefiner />
        ) : (
          <FilterControlDtree />
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

          {page === GlbPagesNames.Dtree && (
            <Button
              text="Text editor"
              className="ml-2"
              variant={'secondary-dark'}
              onClick={() => modalsVisibilityStore.openModalTextEditor()}
              dataTestId={DecisionTreesMenuDataCy.textEditor}
            />
          )}
          {/* Temporarily removed in Refiner page */}
          {page === GlbPagesNames.Dtree && (
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
        <Link className="flex flex-wrap" to={Routes.Root}>
          <Icon name="Close" className="text-white cursor-pointer" />
        </Link>
      </div>
    </div>
  )
})
