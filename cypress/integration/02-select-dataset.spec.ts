import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'

describe('XL Dataset should be opened in decision tree', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'
  const filterName = '⏚Hearing Loss, v.5'

  it('should open XL dataset in decision tree | Test #1', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()
    datasetPage.datasetInfo.datasetHeader.haveText(datasetName)
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.viewerOption.contains('Decision Tree Panel').click()
    cy.url().should('include', `/filter?ds=${datasetName}`)
  })

  it('should open decision tree and select filter | Test #2', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    decisionTreesPage.decisionTreeResults.stepCard.countElements(18)
    cy.wait('@decTreeUpload')
  })

  it('should exclude 3 variants | Test #3/1', () => {
    cy.intercept('POST', '/app/statunits').as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.groupGraphHeaders
      .contains('Variant')
      .scrollIntoView()
    cy.wait('@filterLoad')
    decisionTreesPage.decisionTreeResults.treeToolptip.checkLabelText()
  })

  it('should find graph Most_Severe_Consequence | Test #3/2', () => {
    cy.intercept('POST', '/app/statunits').as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.treeToolptip.checkLabelText()
    decisionTreesPage.decisionTreeResults.graphHeaders
      .contains('Most_Severe_Consequence')
      .scrollIntoView()
      .should('be.visible')
  })

  it('should find group of graphs Presence_in_Databases | Test #3/3', () => {
    cy.intercept('POST', '/app/statunits').as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')
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

  it('should find splice_altering in group of graphs "Predictions" | Test #3/4', () => {
    cy.intercept('POST', '/app/statunits').as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.groupGraphHeaders
      .contains('Predictions')
      .scrollIntoView()
    decisionTreesPage.decisionTreeResults.graphHeaders
      .contains('splice_altering')
      .scrollIntoView()
      .should('be.visible')
  })

  it('should find masked_repeats in group of graphs "Region_Canonical" | Test #3/5', () => {
    cy.intercept('POST', '/app/statunits').as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')
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

  function visitWithFilter() {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
  }
})
