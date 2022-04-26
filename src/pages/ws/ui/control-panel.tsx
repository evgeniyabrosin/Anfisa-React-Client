import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore, { ZoneName } from '@store/filterZone'
import { ControlPanelDivider } from './control-panel-divider'
import { EditFilter } from './control-panel-edit-filter'
import { FilterItemTags } from './control-panel-filter-tags'
import { ControlPanelPreset } from './control-panel-preset'
import { Results } from './control-panel-settings'
import { DatasetCreationButton } from './dataset-creation-button'
import { ZoneItem } from './zones/zone-item'

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
            <ZoneItem
              title={t('ds.gene')}
              itemList={datasetStore.genes}
              selectedItemList={zoneStore.selectedGenes}
              localItemList={zoneStore.localGenes}
              zone={ZoneName.symbol}
            />

            {/* <FilterItemGenes title={t('ds.gene')} /> */}

            <ControlPanelDivider className="bg-blue-secondary" />

            <ZoneItem
              title={t('ds.geneList')}
              itemList={datasetStore.genesList}
              selectedItemList={zoneStore.selectedGenesList}
              localItemList={zoneStore.localGenesList}
              zone={ZoneName.panels}
            />

            <ControlPanelDivider className="bg-blue-secondary" />

            <ZoneItem
              title={t('ds.sample')}
              itemList={datasetStore.samples}
              selectedItemList={zoneStore.selectedSamples}
              localItemList={zoneStore.localSamples}
              zone={ZoneName.hasVariant}
            />

            <ControlPanelDivider className="bg-blue-secondary" />

            <FilterItemTags title={t('ds.tags')} />
          </div>
        )}

        <DatasetCreationButton />
      </div>
    </div>
  )
})
