import { ReactElement } from 'react'
import { Option } from 'react-dropdown'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterPresetStore from '@store/filterPreset'
import { DropDown } from '@ui/dropdown'
import { ControlPanelTitle } from './control-panel-title'

export const Preset = observer(
  (): ReactElement => {
    const presets: string[] = get(datasetStore, 'dsStat.filter-list', []).map(
      (preset: FilterList) => preset.name,
    )

    const onSelectAsync = async (arg: Option) => {
      datasetStore.setIsLoadingTabReport(true)
      datasetStore.setActivePreset(arg.value)
      filterPresetStore.loadPresetAsync(arg.value)
    }

    return (
      <div>
        <ControlPanelTitle title={t('ds.preset')} />

        <DropDown
          options={presets}
          value={datasetStore.activePreset}
          onSelect={onSelectAsync}
          placeholder={t('general.selectAnOption')}
        />
      </div>
    )
  },
)
