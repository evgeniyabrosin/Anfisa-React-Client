import { DatasetCard } from '../../../src/components/data-testid/dataset-card.cy'
import { DatasetInfoDataCy } from '../../../src/components/data-testid/dataset-info.cy'
import { FilterDatasetDataCy } from '../../../src/components/data-testid/filter-dataset.cy'
import { BasePage } from '../lib/base-page'
import { DatasetInfoWidget } from './widgets/dataset-info.widget'
import { LeftPanelWidget } from './widgets/left-panel.widget'

class DatasetPage extends BasePage {
  readonly leftPanel: LeftPanelWidget
  readonly datasetInfo: DatasetInfoWidget
  constructor() {
    super()
    this.leftPanel = new LeftPanelWidget({
      selectors: {
        searchInput: `[data-testid = "${FilterDatasetDataCy.searchInput}"]`,
        leftPanelHeader: `[data-testid = "${FilterDatasetDataCy.leftPanelHeader}"]`,
        datasetsListElem: `[data-testid = "${FilterDatasetDataCy.datasetsListElem}"]`,
      },
      labels: { leftPanelHeader: 'Datasets' },
    })
    this.datasetInfo = new DatasetInfoWidget({
      selectors: {
        openInViewer: `[data-testid = "${DatasetInfoDataCy.openInViewer}"]`,
        decTreePanel: `[data-testid = "${DatasetInfoDataCy.decTreePanel}"]`,
        datasetHeader: `[data-testid = "${DatasetCard.datasetHeader}"]`,
        mainTable: `[data-testid = "${DatasetInfoDataCy.mainTable}"]`,
      },
      labels: {
        datasetHeader: 'xl_PGP3140_wgs_NIST-4_2',
      },
    })
  }
  getDataset(name: string) {
    return cy.get('[data-testid="search-dataset"]').contains(name)
  }
}

export const datasetPage = new DatasetPage()
