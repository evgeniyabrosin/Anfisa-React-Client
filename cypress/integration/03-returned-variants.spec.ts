import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'
import { returnedVariantsPage } from '../page-objects/app/returned-variants-page'
import { ApiEndpoints, Paths } from '../shared/constants'
import { TestData } from '../shared/test-data'
import { Timeouts } from '../shared/timeouts'

describe('Test on table of returned variants', () => {
  const datasetName = 'PGP3140_wgs_NIST-4_2'
  const xlDatasetName = 'xl_' + datasetName
  const filterName = '⏚Hearing Loss, v.5'

  it('should show returned variants correctly | test #4', () => {
    datasetPage.visit(`${Paths.dtree}?ds=${xlDatasetName}`)
    cy.intercept('POST', ApiEndpoints.dtreeSet).as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList')

    cy.intercept('POST', ApiEndpoints.statUnits).as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    cy.wait('@decTreeUpload')

    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    cy.intercept('GET', `${ApiEndpoints.jobStatus}**`).as('jobStatus')
    decisionTreesPage.decisionTreeResults.viewReturnedVariants.click()
    cy.waitJob({ jobAlias: 'jobStatus' })

    returnedVariantsPage.returnedVariantsTable.sampleButton.countElements(3)
    returnedVariantsPage.returnedVariantsTable.returnedVariantsHeader.haveText(
      '[None] chr8:12712859-12712858 insertion',
    )
    returnedVariantsPage.returnedVariantsTable.sampleButton
      .contains('ANO3')
      .click()
    returnedVariantsPage.returnedVariantsTable.returnedVariantsHeader.haveText(
      '[ANO3] chr11:26589499 deletion',
    )
    returnedVariantsPage.returnedVariantsTable.sampleButton
      .contains('GAS7')
      .click()
    returnedVariantsPage.returnedVariantsTable.returnedVariantsHeader.haveText(
      '[GAS7,AC005747.1] chr17:10141987-10141986 insertion',
    )
  })

  it('should add a new dataset correctly | test #5', () => {
    datasetPage.visit(`${Paths.dtree}?ds=${xlDatasetName}`)
    cy.intercept('POST', ApiEndpoints.dtreeSet).as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList', {
      timeout: Timeouts.TenSecondsTimeout,
    })

    cy.intercept('POST', ApiEndpoints.statUnits).as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    cy.wait('@decTreeUpload', {
      timeout: Timeouts.TenSecondsTimeout,
    })
    decisionTreesPage.decisionTreeMenu.saveDataset.click()

    const derivedDataset = 'auto_' + TestData.getRunId()
    decisionTreesPage.decisionTreeMenu.datasetNameInput.type(derivedDataset)
    cy.intercept('POST', ApiEndpoints.ds2ws).as('derivedDataset')
    cy.intercept('GET', `${ApiEndpoints.jobStatus}**`).as('jobStatus')

    decisionTreesPage.decisionTreeMenu.addNewDataset.click()
    cy.wait('@derivedDataset')
    cy.waitJob({ jobAlias: 'jobStatus' })

    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()

    datasetPage.datasetInfo.datasetHeader.haveText(xlDatasetName)
    datasetPage.leftPanel.datasetsListElem.contains(derivedDataset)
  })
})
