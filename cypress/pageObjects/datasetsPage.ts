class DatasetPage {
  getDataset(name: string) {
    cy.get(".flex.items-center.relative.w-full.cursor-pointer").contains(name); //"xl_PGP3140_wgs_NIST-4_2"
  }
}

export default new DatasetPage();
