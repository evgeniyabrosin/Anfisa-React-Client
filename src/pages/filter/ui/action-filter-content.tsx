import { Fragment, ReactElement, useState } from 'react'
import { Option } from 'react-dropdown'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import presetStore from '@store/filterPreset'
import { Button } from '@ui/button'
import { DropDown, DropdownVariantEnum } from '@ui/dropdown'
import { Input } from '@ui/input'

export const ActionFilterContent = observer(
  (): ReactElement => {
    const [activeFilter, setActiveFilter] = useState('')
    const [createPresetName, setCreatePresetName] = useState('')

    if (!filterStore.actionName) {
      return <Fragment />
    }

    const isDisableStandartPreset =
      activeFilter.startsWith('⏚') &&
      (filterStore.actionName === ActionFilterEnum.Delete ||
        filterStore.actionName === ActionFilterEnum.Modify)

    const presets: string[] = get(datasetStore, 'dsStat.filter-list', [])
      .filter((preset: FilterList) => {
        if (
          filterStore.actionName === ActionFilterEnum.Delete ||
          filterStore.actionName === ActionFilterEnum.Modify
        ) {
          return !preset.standard
        }

        return true
      })
      .map((preset: FilterList) => preset.name)

    const handleClick = () => {
      if (filterStore.actionName === ActionFilterEnum.Load) {
        presetStore.loadPresetAsync(activeFilter)
      }

      if (filterStore.actionName === ActionFilterEnum.Delete) {
        presetStore.deletePresetAsync(activeFilter)
        setActiveFilter('')
      }

      if (filterStore.actionName === ActionFilterEnum.Join) {
        presetStore.joinPresetAsync(activeFilter)
      }

      if (filterStore.actionName === ActionFilterEnum.Create) {
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
        presetStore.updatePresetAsync(activeFilter)
      }
    }

    const isButtonDisabled =
      isDisableStandartPreset ||
      (filterStore.actionName !== ActionFilterEnum.Create && !activeFilter) ||
      (filterStore.actionName === ActionFilterEnum.Create && !createPresetName)

    return (
      <div className="flex items-center justify-between">
        {filterStore.actionName === ActionFilterEnum.Create ? (
          <Input
            value={createPresetName}
            placeholder={t('filter.presetName')}
            onChange={e => setCreatePresetName(e.target.value)}
          />
        ) : (
          <DropDown
            options={presets}
            value={activeFilter}
            placeholder={t('general.selectAnOption')}
            variant={DropdownVariantEnum.WHITE}
            onSelect={({ value }: Option) => setActiveFilter(value)}
          />
        )}

        <Button
          text={filterStore.actionName}
          onClick={handleClick}
          className="text-blue-bright"
          disabled={isButtonDisabled}
          hasBackground={false}
        />
      </div>
    )
  },
)
