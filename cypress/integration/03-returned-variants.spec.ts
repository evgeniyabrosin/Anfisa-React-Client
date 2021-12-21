import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'
import { returnedVariantsPage } from '../page-objects/app/returned-variants-page'
import { Timeouts } from '../page-objects/lib/timeouts.cy'

describe('Test on table of returned variants', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'
  const filterName = '⏚Hearing Loss, v.5'

  it('should open main table | test #4', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList')
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    cy.wait('@decTreeUpload')
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    cy.intercept(
      'POST',
      '/app/reccnt?ds=xl_PGP3140_wgs_NIST-4_2&rec=2823765',
    ).as('returnedVariantsTable')
    decisionTreesPage.decisionTreeResults.viewReturnedVariants.click()
    cy.wait('@returnedVariantsTable', {
      timeout: Timeouts.FifteenSecondsTimeout,
    })
    returnedVariantsPage.returnedVariantsTable.sampleButton.countElements(3)
    returnedVariantsPage.returnedVariantsTable.returnedVariantsHeader.haveText(
      '[None] chr8:12712859-12712858 insertion',
    )
    returnedVariantsPage.returnedVariantsTable.sampleButton
      .contains('N - 2')
      .click()
    returnedVariantsPage.returnedVariantsTable.returnedVariantsHeader.haveText(
      '[ANO3] chr11:26589499 deletion',
    )
    returnedVariantsPage.returnedVariantsTable.tableSection
      .getChildren()
      .contains('Quality')
      .parent()
      .click({ force: true })
    //?? Quality dropdown does not open and click happens not on the quality field
    returnedVariantsPage.returnedVariantsTable.sampleButton
      .contains('N - 3')
      .click()
  })

  it('Add dataset and open it in Main Table | test #5', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList', {
      timeout: Timeouts.TenSecondsTimeout,
    })
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    cy.wait('@decTreeUpload', {
      timeout: Timeouts.TenSecondsTimeout,
    })
    decisionTreesPage.decisionTreeMenu.saveDataset.click()
    decisionTreesPage.decisionTreeMenu.datasetNameInput.type(
      'Dataset_from_autotests',
    )
    decisionTreesPage.decisionTreeMenu.addNewDataset.click()
    datasetPage.visit()
    cy.reload()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem
      .getButtonByText('xl_PGP3140_wgs_NIST-4_2')
      .click()
    datasetPage.datasetInfo.datasetHeader.haveText(datasetName)
    datasetPage.leftPanel.datasetsListElem
      .getButtonByText('Dataset_from_autotests')
      .should('exist')
  })
})
