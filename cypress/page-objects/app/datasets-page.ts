import { BasePage } from "../lib/base-page";
import { LeftPanelWidget } from "./widgets/left-panel.widget";
import { FilterDatasetDataCy } from "../../../src/components/data-testid/filter-dataset.cy";
import { DatasetInfoDataCy } from "../../../src/components/data-testid/dataset-info.cy";
import { DatasetInfoWidget } from './widgets/dataset-info.widget';


class DatasetPage extends BasePage {
  readonly leftPanel: LeftPanelWidget;
  readonly datasetInfo: DatasetInfoWidget;
  constructor() {
    super();
    this.leftPanel = new LeftPanelWidget({
      selectors: {
        searchInput: FilterDatasetDataCy.searchInput,
        leftPanelHeader: FilterDatasetDataCy.leftPanelHeader
      }, labels: { leftPanelHeader: 'Datasets' }
    })
    this.datasetInfo = new DatasetInfoWidget({
      selectors: {
        openInViewer: DatasetInfoDataCy.openInViewer,
        decTreePanel: DatasetInfoDataCy.decTreePanel,
        datasetHeader: DatasetInfoDataCy.datasetHeader
      }, labels: {
        datasetHeader: 'xl_PGP3140_wgs_NIST-4_2'
      }
    })
  }
  getDataset(name: string) {
    return cy.get('[data-testid="search-dataset"]').contains(name);
  }
}

export const datasetPage = new DatasetPage();
