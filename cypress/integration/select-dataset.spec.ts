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
    datasetPage.visit('http://localhost:3000/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    decisionTreesPage.decisionTreeMenu.decisionActions.click()
    decisionTreesPage.decisionTreeMenu.selectDropdownElem.getButtonByText(
      'Load',
    )
    //Somehow check that hearing loss was loaded
  })

  it.only('should exclude 3 variants | Test #3', () => {
    datasetPage.visit('http://localhost:3000/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      '⏚Hearing Loss, v.5',
    )
    //decisionTreesPage.decisionTreeMenu.decisionActions.click()
    // decisionTreesPage.decisionTreeMenu.selectDropdownElem
    //   .getButtonByText('Load')
    //   .click()
    cy.wait(1000)
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')
    decisionTreesPage.decisionTreeResults.groupGraphHeaders.contains()
  })
})
