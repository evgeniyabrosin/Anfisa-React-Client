import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { UndoRedoButtons } from '@components/undo-redo-buttons'
import { GlbPagesNames } from '@glb/glb-names'
import { DatasetCreationButton } from '@pages/ws/ui/control-panel/dataset-creation-button'
import { moveActionHistory } from '@utils/moveActionHistory'
import modalsVisibilityStore from '../../dtree/components/modals/modals-visibility-store'
import {
  FilterControlOptions,
  FilterControlOptionsNames,
} from './filter-control.const'
import { SolutionDropDown } from './solution-dropdown'

interface IFilterControlProps {
  SolutionControl: React.ElementType
  className?: string
}

export const FilterControl = observer(
  ({ SolutionControl, className }: IFilterControlProps): ReactElement => {
    const isFirstActionHistoryIndex = dtreeStore.actionHistoryIndex === 0

    const isLastActionHistoryIndex =
      dtreeStore.actionHistoryIndex + 1 ===
      toJS(dtreeStore.actionHistory).length

    const isUndoDisabled = isFirstActionHistoryIndex
    const isRedoDisabled = isLastActionHistoryIndex

    const history = useHistory()
    const params = useParams()
    const dsName = params.get('ds') || ''
    const page: FilterControlOptions =
      filterStore.method as FilterControlOptions
    const pageName: FilterControlOptionsNames = FilterControlOptionsNames[page]

    const goToPage = (name: FilterControlOptions) => {
      const route = getPageRoute(name)

      filterStore.setMethod(name)

      history.push(`${route}?ds=${dsName}`)
    }

    return (
      <div
        className={cn(
          'flex flex-wrap justify-end bg-blue-dark pr-6 pb-4 pl-6',
          className,
        )}
      >
        <div className="flex items-center justify-between w-full mt-3">
          <div className="flex items-center">
            <SolutionDropDown pageName={pageName} goToPage={goToPage} />

            <Divider orientation="vertical" className="h-[75%]" />

            <SolutionControl />

            <Divider orientation="vertical" className="h-[75%]" />

            <DatasetCreationButton />

            {page === GlbPagesNames.Dtree && (
              <>
                <Divider orientation="vertical" className="h-[75%]" />

                <Button
                  text={t('dtree.textEditor')}
                  size="md"
                  variant="secondary-dark"
                  onClick={() => modalsVisibilityStore.openModalTextEditor()}
                  dataTestId={DecisionTreesMenuDataCy.textEditor}
                />
              </>
            )}
          </div>

          <div className="flex items-center">
            {/* TODO: implement undo/redo for FR+WS */}

            {page === GlbPagesNames.Dtree ? (
              <UndoRedoButtons
                onUndo={() => moveActionHistory(-1)}
                onRedo={() => moveActionHistory(1)}
                isUndoDisabled={isUndoDisabled}
                isRedoDisabled={isRedoDisabled}
              />
            ) : (
              <Link className="flex flex-wrap ml-2" to={Routes.Root}>
                <Icon
                  size={15}
                  name="Close"
                  className="text-white cursor-pointer"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  },
)
