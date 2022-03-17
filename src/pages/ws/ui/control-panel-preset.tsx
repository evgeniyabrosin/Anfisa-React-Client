import { ReactElement } from 'react'
import { Option } from 'react-dropdown'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterPresetStore from '@store/filterPreset'
import { DropDown } from '@ui/dropdown'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ControlPanelTitle } from './control-panel-title'

export const Preset = observer((): ReactElement => {
  const presets: string[] = get(datasetStore, 'dsStat.filter-list', []).map(
    (preset: FilterList) => preset.name,
  )

  const onSelectAsync = async (arg: Option, reset?: string) => {
    datasetStore.setActivePreset(arg.value)

    if (datasetStore.prevPreset !== datasetStore.activePreset) {
      filterPresetStore.loadPresetAsync(arg.value, 'ws')

      datasetStore.fetchWsListAsync(false, 'reset')
      datasetStore.setIsLoadingTabReport(true)

      reset && datasetStore.resetActivePreset()
      reset && datasetStore.resetPrevPreset()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <ControlPanelTitle title={t('ds.preset')} />

        {datasetStore.activePreset && (
          <span
            onClick={() =>
              onSelectAsync({ value: '', label: '' } as Option, 'reset')
            }
            className="text-14 text-blue-bright cursor-pointer"
          >
            {t('general.clear')}
          </span>
        )}
      </div>

      <div data-testid={MainTableDataCy.selectPreset}>
        <DropDown
          options={presets}
          value={datasetStore.activePreset}
          onSelect={onSelectAsync}
          placeholder={t('general.selectAnOption')}
        />
      </div>
    </div>
  )
})
