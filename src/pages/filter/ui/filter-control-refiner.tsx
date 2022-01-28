import { Fragment, ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import presetStore from '@store/filterPreset'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Input } from '@ui/input'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/dataset-creation-button'
import { FilterButton } from './filter-button'
import { FilterModal } from './filter-modal'
import { noFirstNumberPattern, noSymbolPattern } from './query-builder/ui/modal-save-dataset'

export const FilterControlRefiner = observer(
  (): ReactElement => {
    const [activePreset, setActivePreset] = useState(datasetStore.activePreset)
    const [createPresetName, setCreatePresetName] = useState('')

    useEffect(() => {
      const dispose = reaction(
        () => datasetStore.activePreset,
        () => {
          if (!datasetStore.activePreset) setActivePreset('')
        },
      )

      return () => dispose()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const presets: string[] = get(datasetStore, 'dsStat.filter-list', [])
      .filter((preset: FilterList) => {
        if (filterStore.actionName === ActionFilterEnum.Delete || filterStore.actionName === ActionFilterEnum.Modify) {
          return !preset.standard
        }

        return true
      })
      .map((preset: FilterList) => preset.name)

    const handleClick = () => {
      if (filterStore.actionName === ActionFilterEnum.Load) {
        datasetStore.setActivePreset(activePreset)

        if (datasetStore.prevPreset !== datasetStore.activePreset) {
          presetStore.loadPresetAsync(activePreset, 'refiner')

          if (!datasetStore.isXL) datasetStore.fetchWsListAsync()
        }

        filterStore.resetActionName()
      }

      if (filterStore.actionName === ActionFilterEnum.Delete) {
        presetStore.deletePresetAsync(activePreset)
        setActivePreset('')
      }

      if (filterStore.actionName === ActionFilterEnum.Join) {
        presetStore.joinPresetAsync(activePreset)
      }

      if (filterStore.actionName === ActionFilterEnum.Create) {
        if (noSymbolPattern.test(createPresetName) || noFirstNumberPattern.test(createPresetName) || createPresetName.length > 50) {
          toast.error(t('filter.notValidName'), {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          })

          return
        }

        createPresetName && presetStore.updatePresetAsync(createPresetName)

        toast.info(t('general.presetCreated'), {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        })

        setCreatePresetName('')

        filterStore.setActionName()
      }

      if (filterStore.actionName === ActionFilterEnum.Modify) {
        presetStore.updatePresetAsync(activePreset)
      }
    }

    const isApplyDisabled =
      activePreset.startsWith('⏚') &&
      (filterStore.actionName === ActionFilterEnum.Modify || filterStore.actionName === ActionFilterEnum.Delete)

    return (
      <Fragment>
        <div className="flex items-center border-black">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-grey-blue text-14 font-bold">{t('filter.presets')}</span>

              <span className="text-blue-bright text-14 cursor-pointer" onClick={() => filterStore.setActionName(ActionFilterEnum.Create)}>
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
              <DropDown options={presets} value={activePreset} onSelect={args => setActivePreset(args.value)} />
            )}
          </div>

          {filterStore.actionName !== ActionFilterEnum.Create && activePreset && (
            <PopperButton ButtonElement={FilterButton} ModalElement={FilterModal} />
          )}

          {filterStore.actionName === ActionFilterEnum.Create && (
            <Button
              text={t('general.cancel')}
              size="md"
              variant={'secondary-dark'}
              className="mt-auto ml-2"
              onClick={() => {
                setActivePreset('')
                setCreatePresetName('')
                filterStore.setActionName()
              }}
            />
          )}

          {filterStore.actionName && (activePreset || createPresetName) && (
            <Button
              text={t('general.apply')}
              size="md"
              onClick={handleClick}
              disabled={isApplyDisabled}
              className="text-white mt-auto ml-2"
            />
          )}
        </div>

        <DatasetCreationButton />
      </Fragment>
    )
  },
)
