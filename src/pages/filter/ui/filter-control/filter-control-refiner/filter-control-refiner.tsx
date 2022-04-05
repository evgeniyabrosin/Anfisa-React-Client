import { Fragment, ReactElement, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import presetStore, { DEFAULT_PRESET_LABEL } from '@store/filterPreset'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Input } from '@ui/input'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/dataset-creation-button'
import { FilterButton } from '../../filter-button'
import { FilterModal } from '../../filter-modal'
import filterControlRefinerStore from './filter-control-refiner.store'

export const FilterControlRefiner = observer((): ReactElement => {
  const { activePreset, presets } = filterControlRefinerStore

  const [createPresetName, setCreatePresetName] = useState<string>('')

  const isSelectedFiltersEmpty: boolean = isEmpty(
    filterStore.selectedFiltersArray,
  )

  const isApplyDisabled =
    activePreset.startsWith(DEFAULT_PRESET_LABEL) &&
    (filterStore.actionName === ActionFilterEnum.Modify ||
      filterStore.actionName === ActionFilterEnum.Delete)

  useEffect(() => {
    const dispose = reaction(
      () => datasetStore.activePreset,
      () => {
        if (!datasetStore.activePreset) datasetStore.resetActivePreset()
      },
    )

    return () => dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectedFiltersEmpty) filterStore.resetActionName()
  }, [isSelectedFiltersEmpty])

  return (
    <Fragment>
      <div className="flex items-center border-black">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-grey-blue text-14 font-bold">
              {t('filter.presets')}
            </span>

            <span
              className="text-blue-bright text-14 cursor-pointer"
              onClick={() => filterStore.setActionName(ActionFilterEnum.Create)}
            >
              {t('filter.createPreset')}
            </span>
          </div>

          {filterStore.actionName === ActionFilterEnum.Create ? (
            <Input
              value={createPresetName}
              placeholder={t('filter.presetName')}
              className="bg-blue-lighter text-white border-2 border-blue-bright"
              style={{ width: 209 }}
              onChange={e => setCreatePresetName(e.target.value)}
            />
          ) : (
            <DropDown
              options={presets}
              value={activePreset}
              onSelect={args => presetStore.loadPreset(args.value)}
            />
          )}
        </div>

        {!isSelectedFiltersEmpty && (
          <PopperButton
            ButtonElement={FilterButton}
            ModalElement={FilterModal}
          />
        )}

        {filterStore.actionName && (
          <>
            <Button
              text={t('general.apply')}
              size="md"
              onClick={() =>
                filterControlRefinerStore.applyAction(
                  createPresetName,
                  isSelectedFiltersEmpty,
                )
              }
              disabled={isApplyDisabled}
              className="text-white mt-auto ml-2"
            />

            <Button
              text={t('general.cancel')}
              size="md"
              variant={'secondary-dark'}
              className="mt-auto ml-2"
              onClick={() => {
                setCreatePresetName('')
                filterStore.resetActionName()
              }}
            />
          </>
        )}
      </div>

      <DatasetCreationButton />
    </Fragment>
  )
})
