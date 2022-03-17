import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { datasetPage } from '../../page-objects/app/datasets-page'
import { mainTablePage } from '../../page-objects/app/main-table-page'
import { variantDrawerPage } from '../../page-objects/app/variant-drawer-page'
import { testData } from '../../page-objects/lib/faker'
import { Timeouts } from '../../page-objects/lib/timeouts.cy'

describe('Regression test of the main table', () => {
  const link = 'ws?ds=PGP3140_wgs_panel_hl'
  const homozygous = '⏚BGM_Homozygous_Rec'
  const datasetName = 'PGP3140_wgs_panel_hl'
  const customTag = testData.getFakeData(1)
  const dataUpload = '/app/tab_report'
  const addTags = '/app/ws_tags'
  const addNote = `/app/ws_tags?ds=${datasetName}&rec=**`
  const excelDownload = `/app/ws_tags?ds=${datasetName}&rec=**`
  const csvDownload = '/app/csv_export'

  it('should open main table for PGP3140_wgs_panel_hl dataset | step 1', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.viewerOption.contains('Main Table').click()
    cy.url().should('include', link)
  })

  it('should apply preset on a dataset | step 2', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
  })

  it('should apply gene to the preset | step 3', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    filterByGene('CHSY1', 'Variants: 1')
  })

  it('should add custom tag to the variant | step 4', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.selectPreset.click()
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    filterByGene('CHSY1', 'Variants: 1')
    mainTablePage.openDrawer('p.Y434=')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    variantDrawerPage.variantDrawer.tagInput.type(customTag, 100)
    variantDrawerPage.waitWhileDisabled()
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags', { timeout: Timeouts.TwentySecondsTimeout })
    variantDrawerPage.variantDrawer.addedTag.element
      .should('be.visible')
      .and('have.text', customTag)
  })

  it('should add note to the variant | step 5', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    filterByGene('CHSY1', 'Variants: 1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.tableRow.element.then(
        () => Cypress.$(CommonSelectors.tableCell).length,
      ),
    )
    mainTablePage.mainTable.tableRow
      .getButtonByText('p.Y434=')
      .click({ force: true })
    //mainTablePage.openDrawer('p.Y434=')
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(testData.getFakeData(4), 100)
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote', { timeout: Timeouts.TwentySecondsTimeout })
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should filter main table by custom tag | step 6', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    mainTablePage.mainTable.addTag.first().click()
    mainTablePage.mainTable.searchFilter.type(customTag)
    mainTablePage.mainTable.checkbox.variantMainTableCheckbox(customTag)
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
  })

  it('should turn off Gene column | step 7', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('Tag')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
  })

  it('should turn on Gene column | step 8', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('Tag')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.clear()
    mainTablePage.mainTable.searchColumn.type('Tag')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(8)
  })

  it('should turn off column from the middle part of a table | step 9', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('In-Silico')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
  })

  it('should turn on column from the middle part of table | step 10', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('In-Silico')
    mainTablePage.mainTable.customizeTableList.element.within(($list: any) => {
      $list.find(CommonSelectors.columnSwitch).trigger('click')
    })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.clear()
    mainTablePage.mainTable.searchColumn.type('In-Silico')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(8)
  })

  it.skip('should save Excel file | test #12', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    cy.intercept('GET', excelDownload).as('reportDownload')
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportExcel.click()
    cy.wait('@reportDownload', { timeout: Timeouts.ThirtyFiveSecondsTimeout })
    cy.readFile(`./cypress/downloads/${datasetName}.xlsx`, 'utf8').should(
      'exist',
    )
  })

  it('should save csv file | test #13', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', dataUpload).as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', dataUpload).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    cy.intercept('POST', csvDownload).as('reportCsvDownload')
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportCsv.click()
    cy.wait('@reportCsvDownload', {
      timeout: Timeouts.ThirtyFiveSecondsTimeout,
    })
    cy.readFile(`./cypress/downloads/${datasetName}.csv`).should('exist')
    cy.readFile(`./cypress/downloads/${datasetName}.csv`).should(
      'contain',
      'ClinVar,HGMD,Coordinate,Change,MSQ',
    )
  })

  function filterByGene(geneName: string, numVariants: string) {
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type(geneName)
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.should('be.visible'),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    cy.intercept('POST', dataUpload).as('applyGeneFilter')
    mainTablePage.mainTable.applyButton.click()
    cy.wait('@applyGeneFilter')
    mainTablePage.mainTable.numVariants.haveText(numVariants)
  }
})
