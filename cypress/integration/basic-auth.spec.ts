import { datasetPage } from "../page-objects/app/datasets-page";

describe("Basic browser auth", () => {

  it("should login into webApp", () => {
    datasetPage.visit();
    // datasetPage.leftPanel.searchInput.type()
  });
});