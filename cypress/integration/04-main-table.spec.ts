import { CommonSelectors } from '../../src/components/data-testid/common-selectors.cy'
import { datasetPage } from '../page-objects/app/datasets-page'
import { mainTablePage } from '../page-objects/app/main-table-page'
import { variantDrawerPage } from '../page-objects/app/variant-drawer-page'
import { Timeouts } from '../page-objects/lib/timeouts.cy'

const today = new Date()

const time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

const dateTime = time

describe('Open saved dataset in MainTable', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'
  const presetName = '⏚SEQaBOO_Hearing_Quick'
  const variants1 = 'Variants: 41'
  const variants2 = 'Variants: 24'
  const forSecondaryReview = `For_secondary_review/${dateTime}`
  const likelyBenign = `Likely Benign/${dateTime}`
  const polyphenHDIV = `Polyphen HDIV D/${dateTime}`
  const benign = `Benign/${dateTime}`
  const loadPreset = '/app/tab_report'
  const addTags = '/app/ws_tags'
  const addNote = '/app/ws_tags?ds=Dataset_from_autotests&rec=**'

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
    datasetPage.datasetInfo.viewerOption.contains('Main Table').click()
    cy.url().should('include', '/ws?ds=Dataset_from_autotests')
  })

  it('should select preset in main table | test #6', () => {
    mainTablePage.visit('ws?ds=Dataset_from_autotests')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', loadPreset).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText(variants1)
    mainTablePage.mainTable.preset.getButtonByText(presetName).click()
    cy.wait('@loadPreset').its('response.statusCode').should('eq', 200)
    mainTablePage.mainTable.numVariants.haveText(variants2)
    mainTablePage.mainTable.addSample.click()
    mainTablePage.mainTable.checkbox.variantMainTableCheckbox('proband [HG002]')
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 8')
    cy.wait('@loadPreset').its('response.statusCode').should('eq', 200)
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
    mainTablePage.openDrawer('p.M541L')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    waitListOfCheckboxes()
    variantDrawerPage.variantDrawer.tagInput.type(likelyBenign, 100)
    variantDrawerPage.waitWhileDisabled()
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains(likelyBenign)
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
    mainTablePage.openDrawer('p.M541L')
    variantDrawerPage.variantDrawer.addNote.click()
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: DM in HGMD but benign in ClinVar, common in AS',
    )
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
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
    mainTablePage.openDrawer('p.A1685P')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    waitListOfCheckboxes()
    variantDrawerPage.variantDrawer.tagInput.type(forSecondaryReview, 100)
    variantDrawerPage.waitWhileDisabled()
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains(forSecondaryReview)
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
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('p.A1685P')
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: more common in Ashkenazi Jews than in other populations, is not present in ClinVar',
      100,
    )
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it.skip('should add tag to the variant | test #10/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KCNQ1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KCNQ1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('p.Y662=')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.intercept('/app/ws_tags?ds=Dataset_from_autotests&rec=*').as('upload')
    waitListOfCheckboxes()
    cy.wait('@upload').its('response.statusCode').should('eq', 200)
    //some pause here before checking the checkbox
    cy.wait(300)
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.get('.ml-2.cursor-pointer').should('have.text', '(#)')
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click(Timeouts.TenSecondsTimeout)

    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
  })

  it('should add note to the variant | test #10/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KCNQ1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KCNQ1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.eq(1).check({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('KCNQ1')
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: DM in HGMD but benign in ClinVar, common in AS',
      100,
    )
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it.skip('should add tag to the variant | test #11/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KBTBD4')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KBTBD4'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('p.E85D')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.intercept('/app/ws_tags?ds=Dataset_from_autotests&rec=*').as('upload')
    waitListOfCheckboxes()
    //cy.wait('@upload')
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'For_secondary_review',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click(Timeouts.TenSecondsTimeout)
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('For_secondary_review')
  })

  it('should add note to the variant | test #11/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KBTBD4')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KBTBD4'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('p.E85D')
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21:  coding in NDUFS3 only, a very rare variant that does not have any clinical annotations, but  It does have damaging in-silico predictions from Polyphen and SIFT',
      100,
    )
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it.skip('should add tag to the variant | test #12', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('CABP2')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'CABP2'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('CABP2')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    waitListOfCheckboxes()
    cy.intercept('/app/ws_tags?ds=Dataset_from_autotests&rec=*').as('upload')
    //cy.wait('@upload')
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click(Timeouts.TenSecondsTimeout)
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
  })

  it('should add custom tag | test #13/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('RNF10')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'RNF10'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('RNF10')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    waitListOfCheckboxes()
    variantDrawerPage.variantDrawer.tagInput.type(polyphenHDIV, 100)
    variantDrawerPage.waitWhileDisabled()
    variantDrawerPage.variantDrawer.addCustomTag.click()
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
    variantDrawerPage.variantDrawer.addedTag.contains(polyphenHDIV)
  })

  it('should add note to the variant | test #13/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('RNF10')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'RNF10'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('RNF10')
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21:  a damaging prediction by Polyphen HDIV',
      100,
    )
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag "Likely Bening" to the variant | test #14', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('ACTG1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'ACTG1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getElement().eq(1).click({ force: true })
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.intercept('/app/ws_tags?ds=Dataset_from_autotests&rec=*').as('upload')
    waitListOfCheckboxes()
    //cy.wait('@upload')
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click(Timeouts.TenSecondsTimeout)
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
  })

  it('should create a new "Benign" tag and apply it to the variant | test #15/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('JAG1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'JAG1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('p.Y255=')
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    waitListOfCheckboxes()
    variantDrawerPage.variantDrawer.tagInput.type(benign, 100)
    variantDrawerPage.waitWhileDisabled()
    variantDrawerPage.variantDrawer.addCustomTag.click()
    cy.intercept('POST', addTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.click()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains(benign)
  })

  it('should add note to the variant | test #15/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('JAG1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'JAG1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.openDrawer('p.Y255=')
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: it is possibly de-novo',
      100,
    )
    cy.intercept('POST', addNote).as('addNote')
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag to the main table | test #16', () => {
    loginWithPreset()
    mainTablePage.mainTable.addTag.first().click()
    mainTablePage.mainTable.searchFilter.type('Benign/Likely benign')
    mainTablePage.mainTable.checkbox.variantMainTableCheckbox(
      'Benign/Likely benign',
    )
    cy.intercept('POST', '/app/ws_list').as('addTag')
    mainTablePage.mainTable.applyButton.click()
    cy.wait('@addTag').its('response.statusCode').should('eq', 200)
    mainTablePage.mainTable.tableRow.element
      .its('length')
      .should('be.not.gt', 7)
  })

  it.skip('should save Excel file | test #17', () => {
    mainTablePage.visit('ws?ds=Dataset_from_autotests')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', loadPreset).as('loadPreset')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚SEQaBOO_Hearing_Quick')
      .click()
    cy.wait('@loadPreset')
    cy.intercept('GET', '/app/excel/Dataset_from_autotests_**.xlsx').as(
      'reportDownload',
    )
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportExcel.click()
    cy.wait('@reportDownload')
    cy.readFile('./cypress/downloads/Dataset_from_autotests.xlsx').should(
      'exist',
    )
  })

  function loginWithPreset() {
    mainTablePage.visit('ws?ds=Dataset_from_autotests')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', loadPreset).as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText(variants1)
    mainTablePage.mainTable.preset.getButtonByText(presetName).click()
    cy.wait('@loadPreset')
    mainTablePage.mainTable.numVariants.haveText(variants2)
  }

  function waitListOfCheckboxes() {
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
  }
})
