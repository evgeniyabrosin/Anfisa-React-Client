import { ReactElement } from 'react'
import { Option } from 'react-dropdown'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterPresetsStore from '@store/filter-presets'
import { DropDown } from '@ui/dropdown'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

export const ControlPanelPreset = observer((): ReactElement => {
  const { activePreset, availablePresets, isFetchingPresets } =
    filterPresetsStore

  const options: string[] = (availablePresets ?? []).map(preset => preset.name)
  const active = isFetchingPresets ? t('dtree.loading') : activePreset

  const onSelectAsync = (arg: Option) => {
    filterPresetsStore.setActivePreset(arg.value)

    datasetStore.fetchWsListAsync('reset')
  }

  return (
    <div>
      {/* TODO: need designer's decision */}

      {/* <div className="flex items-center justify-between">
        {activePreset && (
          <span
            onClick={() => onSelectAsync({ value: '', label: '' } as Option)}
            className="text-14 text-blue-bright cursor-pointer"
          >
            {t('general.clear')}
          </span>
        )}
      </div> */}

      <div className="relative" data-testid={MainTableDataCy.selectPreset}>
        <DropDown
          options={options}
          value={active}
          onSelect={onSelectAsync}
          placeholder={t('general.selectPreset')}
        />
        {isFetchingPresets && (
          <div className="absolute top-0 bottom-0 left-0 right-0" />
        )}
      </div>
    </div>
  )
})
