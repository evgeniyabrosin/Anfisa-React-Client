import { ReactElement } from 'react'

import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ControlPanelDivider } from './control-panel-divider'
import { EditFilter } from './control-panel-edit-filter'
import { ControlPanelPreset } from './control-panel-preset'
import { CustomizeTable } from './customize-table-modal/customize-table'
import { DatasetCreationButton } from './dataset-creation-button'
import { GenesListModal } from './zone-modals/genes-list-modal'
import { GenesModal } from './zone-modals/genes-modal'
import { SamplesModal } from './zone-modals/samples-modal'
import { TagsModal } from './zone-modals/tags-modal'
import { ZoneItem } from './zone-modals/zone-item'

export const ControlPanel = (): ReactElement => (
  <div className="w-full flex px-4 bg-blue-dark">
    <div className="w-full flex justify-between pt-2 pb-4">
      <div className="flex items-center">
        <ControlPanelPreset />

        <ControlPanelDivider />

        <EditFilter />

        <ControlPanelDivider />

        <CustomizeTable />

        <ControlPanelDivider />

        <div className="flex bg-blue-darkHover rounded-sm px-3 min-h-32">
          <ZoneItem
            title={t('ds.gene')}
            modalElement={GenesModal}
            selectedTagsList={zoneStore.selectedGenes}
            removeZoneTag={zoneStore.removeGene}
            dataTestId={MainTableDataCy.addGene}
          />

          <ZoneItem
            title={t('ds.geneList')}
            modalElement={GenesListModal}
            selectedTagsList={zoneStore.selectedGenesList}
            removeZoneTag={zoneStore.removeGenesList}
          />

          <ZoneItem
            title={t('ds.sample')}
            modalElement={SamplesModal}
            selectedTagsList={zoneStore.selectedSamples}
            removeZoneTag={zoneStore.removeSample}
            dataTestId={MainTableDataCy.addSample}
          />

          <ZoneItem
            title={t('ds.tags')}
            modalElement={TagsModal}
            selectedTagsList={zoneStore.selectedTags}
            removeZoneTag={zoneStore.removeLocalTag}
            dataTestId={MainTableDataCy.addTag}
            isLast
          />
        </div>

        <DatasetCreationButton />
      </div>

      {/* TODO: need a functional <UndoRedoButtons /> */}
    </div>
  </div>
)
