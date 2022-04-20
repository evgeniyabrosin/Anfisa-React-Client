import { ReactElement } from 'react'
import { Option } from 'react-dropdown'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterPresetsStore from '@store/filter-presets'
import { DropDown } from '@ui/dropdown'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ControlPanelTitle } from './control-panel-title'

export const ControlPanelPreset = observer((): ReactElement => {
  const { activePreset, availablePresets } = filterPresetsStore

  const options: string[] = (availablePresets ?? []).map(preset => preset.name)

  const onSelectAsync = (arg: Option) => {
    filterPresetsStore.setActivePreset(arg.value)

    datasetStore.fetchWsListAsync(false, 'reset')
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <ControlPanelTitle title={t('ds.preset')} />

        {activePreset && (
          <span
            onClick={() => onSelectAsync({ value: '', label: '' } as Option)}
            className="text-14 text-blue-bright cursor-pointer"
          >
            {t('general.clear')}
          </span>
        )}
      </div>

      <div data-testid={MainTableDataCy.selectPreset}>
        <DropDown
          options={options}
          value={activePreset}
          onSelect={onSelectAsync}
          placeholder={t('general.selectAnOption')}
        />
      </div>
    </div>
  )
})
