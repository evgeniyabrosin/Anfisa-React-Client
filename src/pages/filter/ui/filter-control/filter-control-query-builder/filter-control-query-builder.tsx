import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Input } from '@ui/input'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/dataset-creation-button'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'
import { DtreeModal } from '../../dtree-modal'
import { FilterButton } from '../../filter-button'

export const FilterControlQueryBuilder = observer((): ReactElement => {
  const trees: string[] = get(dtreeStore, 'dtreeList', []).map(
    (preset: FilterList) => preset.name,
  )

  const currentTreeName = dtreeStore.currentDtreeName
  const prevTreeName = dtreeStore.previousDtreeName
  const createNewDtreeName = dtreeStore.createNewDtreeName

  const handleSelect = (value: string) => {
    dtreeStore.setCurrentDtreeName(value)

    if (
      dtreeStore.dtreeCode.length > 13 &&
      dtreeStore.startDtreeCode === dtreeStore.dtreeCode &&
      currentTreeName === prevTreeName
    ) {
      return
    }

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      dtree: value,
    })

    dtreeStore.fetchDtreeSetAsync(body)
    dtreeStore.setQueryBuilderRenderKey(Date.now())
  }

  const handleCreateTree = () => {
    if (dtreeStore.dtreeCode.length < 13) {
      showToast(t('dtree.dtreeIsEmpty'), 'error')
    } else {
      filterStore.setActionName(ActionFilterEnum.Create)
    }
  }

  const handleClick = () => {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
    })

    let instruction, notification

    if (filterStore.actionName === ActionFilterEnum.Create) {
      const isDtreeNameValid = validatePresetName(createNewDtreeName)

      if (!isDtreeNameValid) {
        showToast(t('error.dtreeNameIsNotValid'), 'error')

        return
      }

      instruction = ['DTREE', 'UPDATE', createNewDtreeName]
      notification = `${t('dtree.dtree')} "${createNewDtreeName}" ${t(
        'dtree.hasBeenCreated',
      )}`
      dtreeStore.setCurrentDtreeName(createNewDtreeName)

      dtreeStore.resetCreateNewDtreeName()
    }

    if (filterStore.actionName === ActionFilterEnum.Modify) {
      instruction = ['DTREE', 'UPDATE', dtreeStore.currentDtreeName]
      notification = `${t('dtree.dtree')} "${dtreeStore.currentDtreeName}" ${t(
        'dtree.hasBeenModified',
      )}`

      dtreeStore.setStartDtreeCode()
    }

    body.append('instr', JSON.stringify(instruction))

    dtreeStore.fetchDtreeSetAsync(body)

    notification && showToast(notification, 'success')

    filterStore.setActionName()
  }

  const isApplyDisabled =
    dtreeStore.currentDtreeName.startsWith('⏚') &&
    (filterStore.actionName === ActionFilterEnum.Modify ||
      filterStore.actionName === ActionFilterEnum.Delete)

  return (
    <Fragment>
      <div className="flex items-center border-black">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-grey-blue text-14 font-bold">
              {t('filter.decisionTrees')}
            </span>

            <span
              className={cn(
                'text-blue-bright text-14 cursor-pointer hover:text-blue-light',
              )}
              onClick={handleCreateTree}
              data-testid={DecisionTreesMenuDataCy.createNew}
            >
              {t('filter.createPreset')}
            </span>
          </div>

          {filterStore.actionName === ActionFilterEnum.Create ? (
            <Input
              value={createNewDtreeName}
              placeholder={t('dtree.decisionTreeName')}
              className="bg-blue-lighter text-white border-2 border-blue-bright"
              style={{ width: 209 }}
              onChange={e => dtreeStore.setCreateNewDtreeName(e.target.value)}
            />
          ) : (
            <DropDown
              options={trees}
              value={currentTreeName}
              onSelect={args => handleSelect(args.value)}
            />
          )}
        </div>

        {filterStore.actionName !== ActionFilterEnum.Create && (
          <PopperButton
            ButtonElement={FilterButton}
            ModalElement={DtreeModal}
          />
        )}

        {(createNewDtreeName ||
          filterStore.actionName === ActionFilterEnum.Modify) && (
          <Button
            text={t('general.apply')}
            disabled={isApplyDisabled}
            size="md"
            onClick={handleClick}
            className="text-white mt-auto ml-2"
            dataTestId={DecisionTreesMenuDataCy.applyNewTree}
          />
        )}

        {(createNewDtreeName ||
          filterStore.actionName === ActionFilterEnum.Modify ||
          filterStore.actionName === ActionFilterEnum.Create) && (
          <Button
            text={t('general.cancel')}
            size="md"
            variant={'secondary-dark'}
            className={cn('mt-auto ml-2')}
            onClick={() => {
              filterStore.setActionName()
              dtreeStore.resetCreateNewDtreeName()
            }}
          />
        )}
      </div>
      <DatasetCreationButton />
    </Fragment>
  )
})
