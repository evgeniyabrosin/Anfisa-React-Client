/* eslint-disable no-undef */
import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { datasetPage } from '../../page-objects/app/datasets-page'
import { mainTablePage } from '../../page-objects/app/main-table-page'
import { variantDrawerPage } from '../../page-objects/app/variant-drawer-page'
import { TestData } from '../../shared/test-data'
import { Timeouts } from '../../shared/timeouts'

describe('Regression test of the main table | step 1', () => {
  const link = '/ws?ds=PGP3140_wgs_panel_hl'
  const homozygous = '⏚BGM_Homozygous_Rec'
  const datasetName = 'PGP3140_wgs_panel_hl'
  const customTag = TestData.getSentence(1)

  it('should open main table for PGP3140_wgs_panel_hl dataset', () => {
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
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
  })

  it('should apply gene to the preset | step 3', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')

    filterByGene('CHSY1', 'Variants: 1')
  })

  it('should add custom tag to the variant | step 4', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.selectPreset.click()
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    filterByGene('CHSY1', 'Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.Y434=').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    variantDrawerPage.variantDrawer.tagInput.type(customTag, 100)
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.addCustomTag.element.should(
        'not.be.disabled',
      ),
    )
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', '/app/ws_tags').as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags', { timeout: Timeouts.TwentySecondsTimeout })
    variantDrawerPage.variantDrawer.addedTag.element
      .should('be.visible')
      .and('have.text', customTag)
  })

  it('should add note to the variant | step 5', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
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
    mainTablePage.mainTable.tableRow.getButtonByText('p.Y434=').click()
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(TestData.getSentence(4))
    cy.intercept('POST', `/app/ws_tags?ds=${datasetName}&rec=**`).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote', { timeout: Timeouts.TwentySecondsTimeout })
  })

  it('should filter main table by custom tag | step 6', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
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
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('Gene')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
  })

  it('should turn on Gene column | step 8', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('Gene')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.clear()
    mainTablePage.mainTable.searchColumn.type('Gene')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(8)
  })

  it('should turn off column from the middle part of a table | step 9', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
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
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
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

  it('should save Excel file | test #12', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    cy.intercept('GET', `/app/excel/${datasetName}_****.xlsx`).as(
      'reportDownload',
    )
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportExcel.click()
    cy.wait('@reportDownload', { timeout: Timeouts.ThirtyFiveSecondsTimeout })
    cy.readFile(`./cypress/downloads/${datasetName}.xlsx`, 'utf8').should(
      'exist',
    )
  })

  it('should save csv file | test #13', () => {
    mainTablePage.visit(link)
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: Timeouts.TwentySecondsTimeout })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset.getButtonByText(homozygous).click()
    cy.wait('@loadPreset', { timeout: Timeouts.TwentySecondsTimeout })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    cy.intercept('POST', '/app/csv_export').as('reportCsvDownload')
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
    cy.intercept('POST', '/app/tab_report').as('applyGeneFilter')
    mainTablePage.mainTable.applyButton.click()
    cy.wait('@applyGeneFilter')
    mainTablePage.mainTable.numVariants.haveText(numVariants)
  }
})
