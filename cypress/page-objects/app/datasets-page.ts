import { BasePage } from "../lib/basePage";
import { LeftPanelWidget } from "./widgets/left-panel.widget";
import { FilterDatasetDataCy } from "../../../src/components/data-testid/dataset-page.cy";


class DatasetPage extends BasePage {
  readonly leftPanel: LeftPanelWidget;
  constructor() {
    super();
    this.leftPanel = new LeftPanelWidget({
      selectors: {
        searchInput: FilterDatasetDataCy.searchInput,
        leftPanelHeader: FilterDatasetDataCy.leftPanelHeader
      }, labels: { leftPanelHeader: 'Datasets' }
    })
  }
  getDataset(name: string) {
    return cy.get(".flex.items-center.relative.w-full.cursor-pointer").contains(name); //name = "xl_PGP3140_wgs_NIST-4_2"
    //selector is changed to data-testid = search-dataset
  }
}

export const datasetPage = new DatasetPage();
