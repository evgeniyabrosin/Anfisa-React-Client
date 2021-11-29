import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'
import { returnedVariantsPage } from '../page-objects/app/returned-variants-page'

describe('Test on main table of returned variants', () => {
  it('should open main table | test #4', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    cy.wait('@selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    cy.wait(1000)

    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    cy.intercept(
      'POST',
      '/app/reccnt?ds=xl_PGP3140_wgs_NIST-4_2&rec=2823765',
    ).as('returnedVariantsTable')
    decisionTreesPage.decisionTreeResults.viewReturnedVariants.click()
    cy.wait('@returnedVariantsTable', { timeout: 10000 })
    returnedVariantsPage.returnedVariantsTable.sampleButton.length(3)
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
      .click({ force: true })
    //?? Quality dropdown does not open and click happens not on the quality field
    returnedVariantsPage.returnedVariantsTable.sampleButton
      .contains('N - 3')
      .click()
  })

  it('Add dataset and open it in Main Table | test #5', () => {
    datasetPage.visit('filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    cy.wait('@selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    cy.wait(1000)
    decisionTreesPage.decisionTreeMenu.saveDataset.click()
    decisionTreesPage.decisionTreeMenu.datasetNameInput.type(
      'Dataset_from_autotests',
    )
    decisionTreesPage.decisionTreeMenu.addNewDataset.click()
  })
})
