import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { ControlPanelDivider } from './control-panel-divider'
import { EditFilter } from './control-panel-edit-filter'
import { FilterItemGenes } from './control-panel-filter-genes'
import { FilterItemGenesList } from './control-panel-filter-genes-list'
import { FilterItemSamples } from './control-panel-filter-samples'
import { FilterItemTags } from './control-panel-filter-tags'
import { ControlPanelPreset } from './control-panel-preset'
import { Results } from './control-panel-settings'
import { DatasetCreationButton } from './dataset-creation-button'

export const ControlPanel = observer((): ReactElement => {
  const sectionClassName = 'rounded flex bg-white bg-opacity-2 p-4'

  return (
    <div className="w-auto flex pb-3 px-4 bg-blue-dark">
      <div className={sectionClassName}>
        <ControlPanelPreset />

        <ControlPanelDivider />

        <EditFilter />

        <ControlPanelDivider />

        <Results />

        {!datasetStore.isXL && (
          <div className="flex ml-5 bg-blue-lighter rounded-sm py-2 px-3">
            <FilterItemGenes title={t('ds.gene')} />

            <ControlPanelDivider className="bg-blue-secondary" />

            <FilterItemGenesList title={t('ds.geneList')} />

            <ControlPanelDivider className="bg-blue-secondary" />

            <FilterItemSamples title={t('ds.sample')} />

            <ControlPanelDivider className="bg-blue-secondary" />

            <FilterItemTags title={t('ds.tags')} />
          </div>
        )}

        <DatasetCreationButton />
      </div>
    </div>
  )
})
