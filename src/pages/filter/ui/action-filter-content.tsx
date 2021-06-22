import { Fragment, ReactElement, useState } from 'react'
import { Option } from 'react-dropdown'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
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
        datasetStore.loadPresetAsync(activeFilter)
      }

      if (filterStore.actionName === ActionFilterEnum.Delete) {
        datasetStore.deletePresetAsync(activeFilter)
        setActiveFilter('')
      }

      if (filterStore.actionName === ActionFilterEnum.Join) {
        datasetStore.joinPresetAsync(activeFilter)
      }

      if (filterStore.actionName === ActionFilterEnum.Create) {
        createPresetName && datasetStore.updatePresetAsync(createPresetName)
      }

      if (filterStore.actionName === ActionFilterEnum.Modify) {
        datasetStore.updatePresetAsync(activeFilter)
      }
    }

    const isButtonDisabled =
      isDisableStandartPreset ||
      (filterStore.actionName !== ActionFilterEnum.Create && !activeFilter) ||
      (filterStore.actionName === ActionFilterEnum.Create && !createPresetName)

    return (
      <div className="flex items-center justify-between w-full mt-5">
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
