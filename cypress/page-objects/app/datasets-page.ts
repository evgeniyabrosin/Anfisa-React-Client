import { BasePage } from "../lib/basePage";
import { LeftPanelWidget } from "./widgets/left-panel.widget";
import { DatasetInfoDataCy, FilterDatasetDataCy } from "../../../src/components/data-testid/dataset-page.cy";
import { DatasetInfoWidget } from './widgets/dataset-info.widget'


class DatasetPage extends BasePage {
  readonly leftPanel: LeftPanelWidget;
  readonly datasetInfo: DatasetInfoWidget
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
    return cy.get(".flex.items-center.relative.w-full.cursor-pointer").contains(name); //name = "xl_PGP3140_wgs_NIST-4_2"
    //selector is changed to data-testid = search-dataset
  }
}

export const datasetPage = new DatasetPage();
