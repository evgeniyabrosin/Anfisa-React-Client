import { datasetPage } from '../page-objects/app/datasets-page'
import { mainTablePage } from '../page-objects/app/main-table-page'

describe('Open saved dataset in MainTable', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'
  const presetName = '⏚SEQaBOO_Hearing_Quick'
  const variants1 = 'Variants: 41'
  const variants2 = 'Variants: 24'

  it('should open saved on previous step dataset and open it in main table', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem
      .getButtonByText('Dataset_from_autotests')
      .click()
    cy.waitUntil(() =>
      datasetPage.datasetInfo.datasetHeader.element.then(el => {
        return el.text() === 'Dataset_from_autotests'
      }),
    )
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.mainTable.click()
    cy.url().should('include', '/ws?ds=Dataset_from_autotests')
  })

  it('should select preset in main table | test #6', () => {
    mainTablePage.visit('/ws?ds=Dataset_from_autotests')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText(variants1)
    mainTablePage.mainTable.preset.getButtonByText(presetName).click()
    cy.wait('@loadPreset').its('response.statusCode').should('eq', 200)
    mainTablePage.mainTable.numVariants.haveText(variants2)
    mainTablePage.mainTable.addSample.click()
  })

  it('should add custom tag to the variant | test #8/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KIT')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KIT'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
  })

  it('should add note to the variant | test #8/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KIT')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KIT'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
  })

  it('should add custom tag "for secondary review" | test #9/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('BDP1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'BDP1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
  })

  it('should add note to the variant | test #9/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('BDP1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'BDP1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
  })

  function loginWithPreset() {
    mainTablePage.visit('/ws?ds=Dataset_from_autotests')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText(variants1)
    mainTablePage.mainTable.preset.getButtonByText(presetName).click()
    cy.wait('@loadPreset')
    mainTablePage.mainTable.numVariants.haveText(variants2)
  }
})
