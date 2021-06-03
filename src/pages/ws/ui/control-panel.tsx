import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import { Tags } from '@ui/tags'
import { Filters } from './filters'
import { Preset } from './preset'
import { Settings } from './settings'

export const ControlPanel = observer(
  (): ReactElement => {
    return (
      <div className="flex pb-3 px-4 bg-blue-dark">
        <Preset />

        <Filters />

        <Tags tags={datasetStore.selectedTags} />

        <Settings />
      </div>
    )
  },
)
