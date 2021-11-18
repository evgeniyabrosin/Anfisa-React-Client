import { datasetPage } from "../page-objects/app/datasets-page";

describe("XL Dataset should be opened in decision tree", () => {

    it("should click on XL dataset and open it in decision tree", () => {
        datasetPage.visit();
        datasetPage.leftPanel.leftPanelHeader.haveText('Datasets'); // Dataset list opened
        datasetPage.leftPanel.datasetsListElem.getButtonByText('xl_PGP3140_wgs_NIST-4_2').click();
        datasetPage.datasetInfo.datasetHeader.haveText('xl_PGP3140_wgs_NIST-4_2'); // the right dataset is chosen and dataset info is opened
        datasetPage.datasetInfo.openInViewer.click();
        datasetPage.datasetInfo.decTreePanel.click();

    })
})