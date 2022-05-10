import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { PresetControl } from '@components/preset-control'
import { DatasetCreationButton } from '@pages/ws/ui/control-panel/dataset-creation-button'
import {
  applyPreset,
  createPreset,
  deletePreset,
  joinPreset,
  modifyPreset,
} from './filter-control-refiner.utils'

export const FilterControlRefiner = observer((): ReactElement => {
  const { activePreset, availablePresets } = filterPresetsStore

  return (
    <>
      <PresetControl
        selected={activePreset}
        presets={availablePresets}
        isCreateDisabled={filterStore.isConditionsEmpty}
        onCreate={createPreset}
        onApply={applyPreset}
        onJoin={joinPreset}
        onModify={modifyPreset}
        onDelete={deletePreset}
      />
      <DatasetCreationButton />
    </>
  )
})
