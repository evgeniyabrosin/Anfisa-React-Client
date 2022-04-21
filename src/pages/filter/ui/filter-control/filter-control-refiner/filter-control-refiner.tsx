import { Fragment, ReactElement, useEffect } from 'react'
import { Option } from 'react-dropdown'
import { observer } from 'mobx-react-lite'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Input } from '@ui/input'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/dataset-creation-button'
import { FilterButton } from '../../filter-button'
import { PresetActionsModal } from '../../preset-actions-modal'
import filterControlRefinerStore from './filter-control-refiner.store'

export const FilterControlRefiner = observer((): ReactElement => {
  const { actionName, activePreset, presets, presetNameForAction } =
    filterControlRefinerStore

  const isSelectedFiltersEmpty: boolean = filterStore.isConditionsEmpty

  const isActionMode = !!actionName
  const isApplyDisabled = !presetNameForAction

  useEffect(() => {
    if (isSelectedFiltersEmpty) filterControlRefinerStore.resetActionName()
  }, [isSelectedFiltersEmpty])

  const handlePresetSelect = ({ value }: Option) => {
    if (isActionMode) {
      filterControlRefinerStore.setPresetNameForAction(value)
    } else {
      filterPresetsStore.setActivePreset(value)
    }
  }

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
              onClick={() =>
                filterControlRefinerStore.setActionName(ActionFilterEnum.Create)
              }
            >
              {t('filter.createPreset')}
            </span>
          </div>

          {actionName === ActionFilterEnum.Create ? (
            <Input
              value={presetNameForAction}
              placeholder={t('filter.presetName')}
              className="bg-blue-lighter text-white border-2 border-blue-bright"
              style={{ width: 209 }}
              onChange={e =>
                filterControlRefinerStore.setPresetNameForAction(e.target.value)
              }
            />
          ) : (
            <DropDown
              options={presets}
              value={isActionMode ? presetNameForAction : activePreset}
              onSelect={handlePresetSelect}
            />
          )}
        </div>

        {!isSelectedFiltersEmpty && (
          <PopperButton
            ButtonElement={FilterButton}
            ButtonProps={{
              text: actionName,
            }}
            ModalElement={PresetActionsModal}
            ModalProps={{
              onSelect: (action: ActionFilterEnum) => {
                filterControlRefinerStore.setActionName(action)
              },
            }}
          />
        )}

        {actionName && (
          <>
            <Button
              text={t('general.apply')}
              size="md"
              onClick={() => filterControlRefinerStore.applyAction()}
              disabled={isApplyDisabled}
              className="text-white mt-auto ml-2"
            />

            <Button
              text={t('general.cancel')}
              size="md"
              variant={'secondary-dark'}
              className="mt-auto ml-2"
              onClick={() => {
                filterControlRefinerStore.resetAction()
              }}
            />
          </>
        )}
      </div>

      <DatasetCreationButton />
    </Fragment>
  )
})
