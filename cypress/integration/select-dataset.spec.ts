import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'

describe('XL Dataset should be opened in decision tree', () => {
  it('should click on XL dataset and open it in decision tree', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem
      .getButtonByText('xl_PGP3140_wgs_NIST-4_2')
      .click()
    datasetPage.datasetInfo.datasetHeader.haveText('xl_PGP3140_wgs_NIST-4_2')
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.decTreePanel.click()
  })

  it('should open decision tree and choose Hearing Loss v.5 filter | Test #2', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    //Somehow check that hearing loss was loaded
  })

  it('should exclude 3 variants | Test #3/1', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    cy.wait(1000)
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.groupGraphHeaders
      .contains('Variant')
      .scrollIntoView()
  })

  it('should find Most_Severe_Consequence | Test #3/2', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    cy.wait(1000)
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.graphHeaders
      .contains('Most_Severe_Consequence')
      .scrollIntoView()
  })

  it('should find Presence_in_Databases | Test #3/3', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    cy.wait(1000)
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.groupGraphHeaders
      .contains('Variant')
      .scrollIntoView()
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .first()
      .type('Presence_in_Databases')
    decisionTreesPage.decisionTreeResults.graphHeaders.contains(
      'Presence_in_Databases',
    )
  })

  it('should find masked_repeats in "Region_Canonical" | Test #3/4', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    cy.wait(1000)
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.groupGraphHeaders
      .contains('Coordinates')
      .scrollIntoView()
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .first()
      .type('Region_Canonical')
    decisionTreesPage.decisionTreeResults.graphHeaders.contains(
      'Region_Canonical',
    )
  })
})
