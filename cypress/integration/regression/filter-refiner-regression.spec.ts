import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { FilterRefiner } from '../../../src/components/data-testid/filter-refiner.cy'
import { filterRefinerPage } from '../../page-objects/app/filter-refiner-page'
import { Helper } from '../../page-objects/lib/helpers'

describe('Filter refiner regression test', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'

  it('should search attribute via substring | step 1', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.searchField.type('Compound_req')
    filterRefinerPage.leftPanel.listElements.countElements(1)
    filterRefinerPage.leftPanel.listElements.contains('Compound_Request')
  })

  it('should choose values | step 2', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element.contains('Callers').click()
    cy.intercept('POST', '/app/ds_stat').as('addFilters')
    filterRefinerPage.filter.filterElements
      .first()
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.filterElements
      .eq(2)
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.addButton.click()
    cy.wait('@addFilters')
    filterRefinerPage.total.resultsListElement.countElements(2)
  })

  it('shows empty list until problem groups is chosen | step 3', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Inheritance_Mode')
      .click()
    filterRefinerPage.filter.noProblemGroupSelected.checkExists()
  })

  it('should show filter | step 4', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    cy.intercept('POST', '/app/statunits').as('problemGroup')
    filterRefinerPage.leftPanel.listElements.element
      .contains('Inheritance_Mode')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.problemGroup.element.should('be.visible'),
    )
    filterRefinerPage.filter.filterElementsCheckbox
      .siblings(Helper.getDataId(FilterRefiner.problemGroup))
      .contains('HG002')
      .siblings(CommonSelectors.checkbox)
      .click()
    cy.wait('@problemGroup')
    cy.waitUntil(() =>
      filterRefinerPage.filter.geneName.element
        .contains('Autosomal Dominant')
        .should('be.visible'),
    )
    filterRefinerPage.filter.geneName
      .contains('Autosomal Dominant')
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.addButton.click()
    filterRefinerPage.total.resultsListElement.countElements(1)
    filterRefinerPage.total.resultsListElement.contains('Inheritance_Mode')
  })

  it('should display chosen filter in total | step 5', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Custom_Inheritance_Mode')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    cy.intercept('POST', '/app/statfunc').as('uploadReset')
    filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
    cy.wait('@uploadReset')
    //TODO click All mode checkbox
    filterRefinerPage.filter.addButton.click()
    filterRefinerPage.total.resultsListElement.countElements(1)
    filterRefinerPage.total.resultsListElement.contains(
      'Custom_Inheritance_Mode',
    )
  })

  it('should display chosen filter in total | step 6', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Custom_Inheritance_Mode')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    cy.intercept('POST', '/app/statfunc').as('uploadReset')
    filterRefinerPage.filter.selectReset.select('Compensational')
    cy.wait('@uploadReset')
    //TODO click Not mode checkbox
    filterRefinerPage.filter.addButton.click()
    filterRefinerPage.total.resultsListElement.countElements(1)
    filterRefinerPage.total.resultsListElement.contains(
      'Custom_Inheritance_Mode',
    )
  })

  it('should display filter and message in total | step 7', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Compound_Het')
      .click()
  })

  it('should not applly filter if Add is not pressed | step 8', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Compound_Request')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
    filterRefinerPage.filter.addButton.first().click()
    filterRefinerPage.total.resultsListElement.countElements(0)
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should add new row | step 9', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Compound_Request')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
    filterRefinerPage.filter.addButton.first().click()
    filterRefinerPage.filter.selectReset.select('Autosomal Dominant')
    filterRefinerPage.filter.addButton.first().click()
    //TODO count the number of smth
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should delete first row | step 10', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Compound_Request')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
    filterRefinerPage.filter.addButton.first().click()
    filterRefinerPage.filter.selectReset.select('Autosomal Dominant')
    filterRefinerPage.filter.addButton.first().click()
    //count the number of lines
    filterRefinerPage.filter.removeButton.click()
    //count the number of lines
  })

  it('should add filter | step 11', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('Num_Samples')
      .click()
    cy.waitUntil(() =>
      filterRefinerPage.filter.inputNumberSamples.element.should('be.visible'),
    )
    filterRefinerPage.filter.inputNumberSamples.first().type('1')
    filterRefinerPage.filter.inputNumberSamples.eq(1).type('3')
    filterRefinerPage.filter.addButton.click()
    filterRefinerPage.total.resultsListElement.countElements(1)
    filterRefinerPage.total.resultsListElement.contains('Num_Samples')
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should add filter | step 12', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element
      .contains('GeneRegion')
      .click()
    filterRefinerPage.filter.inputText
      .eq(1)
      .type('I dont know what to type in here')
    filterRefinerPage.filter.addButton.click()
    filterRefinerPage.total.resultsListElement.countElements(1)
    filterRefinerPage.total.resultsListElement.contains('Num_Samples')
  })

  it('should undone all actions | step 13', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element.contains('Callers').click()
    cy.intercept('POST', '/app/ds_stat').as('addFilters')
    filterRefinerPage.filter.filterElements
      .first()
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.filterElements
      .eq(2)
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.addButton.click()
    cy.wait('@addFilters')
    filterRefinerPage.total.resultsListElement.countElements(2)
    filterRefinerPage.menu.undoButton.click()
    filterRefinerPage.total.resultsListElement.countElements(0)
  })

  //skip until redo button is fixed
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should redo undone steps| step 14', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    filterRefinerPage.leftPanel.listElements.element.contains('Callers').click()
    cy.intercept('POST', '/app/ds_stat').as('addFilters')
    filterRefinerPage.filter.filterElements
      .first()
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.filterElements
      .eq(2)
      .siblings(CommonSelectors.checkbox)
      .click()
    filterRefinerPage.filter.addButton.click()
    cy.wait('@addFilters')
    filterRefinerPage.total.resultsListElement.countElements(2)
    filterRefinerPage.menu.undoButton.click()
    filterRefinerPage.total.resultsListElement.countElements(0)
    filterRefinerPage.menu.redoButton.click()
    cy.waitUntil(() =>
      filterRefinerPage.total.resultsListElement.element.should('be.visible'),
    )
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should apply every filter | step 15', () => {
    filterRefinerPage.visit(`/filter/refiner/?ds=${datasetName}`)
    //there is no apply button
  })
})
