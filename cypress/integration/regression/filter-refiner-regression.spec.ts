import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { FilterRefinerDataCy } from '../../../src/components/data-testid/filter-refiner.cy'
import { filterRefinerPage } from '../../page-objects/app/filter-refiner-page'
import { Helper } from '../../page-objects/lib/helpers'

describe('Filter refiner regression test', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'
  const link = `filter/refiner/?ds=${datasetName}`
  const addFilters = '/app/ds_stat'
  const problemGroup = '/app/statunits'
  const uploadReset = '/app/statfunc'

  it('should search attribute via substring | step 1', () => {
    filterRefinerPage.visit(link)
    filterRefinerPage.leftPanel.searchField.type('Compound_req')
    filterRefinerPage.leftPanel.listElements.countElements(1)
    filterRefinerPage.leftPanel.listElements.contains('Compound_Request')
  })

  it('should choose values | step 2', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Callers')
    cy.intercept('POST', addFilters).as('addFilters')
    selectFilterElements(0)
    selectFilterElements(2)
    filterRefinerPage.filter.addButton.click()
    cy.wait('@addFilters')
    filterRefinerPage.total.resultsListElement.countElements(2)
  })

  it('shows empty list until problem groups is chosen | step 3', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Inheritance_Mode')
    filterRefinerPage.filter.noProblemGroupSelected.checkExists()
  })

  it('should show filter | step 4', () => {
    filterRefinerPage.visit(link)
    cy.intercept('POST', problemGroup).as('problemGroup')
    selectElementInLeftPanel('Inheritance_Mode')
    cy.waitUntil(() =>
      filterRefinerPage.filter.problemGroup.element.should('be.visible'),
    )
    filterRefinerPage.filter.filterElementsCheckbox
      .siblings(Helper.getDataId(FilterRefinerDataCy.problemGroup))
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
    countAddedElements(1, 'Inheritance_Mode')
  })

  it('should display chosen filter in total | step 5', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Custom_Inheritance_Mode')
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    cy.intercept('POST', uploadReset).as('uploadReset')
    filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
    cy.wait('@uploadReset')
    //TODO click All mode checkbox
    countAddedElements(1, 'Custom_Inheritance_Mode')
  })

  it('should display chosen filter in total | step 6', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Custom_Inheritance_Mode')
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    cy.intercept('POST', uploadReset).as('uploadReset')
    filterRefinerPage.filter.selectReset.select('Compensational')
    cy.wait('@uploadReset')
    //TODO click Not mode checkbox
    countAddedElements(1, 'Custom_Inheritance_Mode')
  })

  it('should display filter and message in total | step 7', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Compound_Het')
    cy.get('form > .flex > .Dropdown-root > .Dropdown-control').click()
    cy.get('[role="option"]').contains('shared gene').click()
    filterRefinerPage.filter.addButton.click()
    cy.get('.text-red-secondary').should(
      'have.text',
      'Improper approx mode gene',
    )
  })

  it('should not apply filter if Add is not pressed | step 8', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Compound_Request')
    cy.waitUntil(() =>
      filterRefinerPage.filter.selectReset.element.should('be.visible'),
    )
    filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
    filterRefinerPage.filter.addButton.first().click()
    filterRefinerPage.total.resultsListElement.countElements(0)
  })

  // it.skip('should add new row | step 9', () => {
  //   filterRefinerPage.visit(link)
  //   selectElementInLeftPanel('Compound_Request')
  //   cy.waitUntil(() =>
  //     filterRefinerPage.filter.selectReset.element.should('be.visible'),
  //   )
  //   filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
  //   filterRefinerPage.filter.addButton.first().click()
  //   filterRefinerPage.filter.selectReset.select('Autosomal Dominant')
  //   filterRefinerPage.filter.addButton.first().click()
  //   TODO count the number of smth
  // })

  // it.skip('should delete first row | step 10', () => {
  //   filterRefinerPage.visit(link)
  //   selectElementInLeftPanel('Compound_Request')
  //   cy.waitUntil(() =>
  //     filterRefinerPage.filter.selectReset.element.should('be.visible'),
  //   )
  //   filterRefinerPage.filter.selectReset.select('Homozygous Recessive/X-linked')
  //   filterRefinerPage.filter.addButton.first().click()
  //   filterRefinerPage.filter.selectReset.select('Autosomal Dominant')
  //   filterRefinerPage.filter.addButton.first().click()
  //   //count the number of lines
  //   filterRefinerPage.filter.removeButton.click()
  //   //count the number of lines
  // })

  it('should add filter | step 11', () => {
    filterRefinerPage.visit(link)
    selectElementInLeftPanel('Num_Samples')
    cy.waitUntil(() =>
      filterRefinerPage.filter.inputNumberSamples.element.should('be.visible'),
    )
    filterRefinerPage.filter.inputNumberSamples.first().type('1')
    filterRefinerPage.filter.inputNumberSamples.eq(1).type('3')
    countAddedElements(1, 'Num_Samples')
  })

  // it.skip('should add filter | step 12', () => {
  //   filterRefinerPage.visit(link)
  //   selectElementInLeftPanel('GeneRegion')
  //   filterRefinerPage.filter.inputText
  //     .eq(1)
  //     .type('I dont know what to type in here')
  //   countAddedElements(1, 'Num_Samples')
  // })

  it('should undone all actions | step 13', () => {
    filterRefinerPage.visit(link)
    filterRefinerPage.leftPanel.listElements.element.contains('Callers').click()
    selectElementInLeftPanel('Callers')
    cy.intercept('POST', addFilters).as('addFilters')
    selectFilterElements(0)
    selectFilterElements(2)
    filterRefinerPage.filter.addButton.click()
    cy.wait('@addFilters')
    filterRefinerPage.total.resultsListElement.countElements(2)
    filterRefinerPage.menu.undoButton.click()
    filterRefinerPage.total.resultsListElement.countElements(0)
  })

  //skip until redo button is fixed

  // it.skip('should redo undone steps| step 14', () => {
  //   filterRefinerPage.visit(link)
  //   selectElementInLeftPanel('Callers')
  //   cy.intercept('POST', addFilters).as('addFilters')
  //   selectFilterElements(0)
  //   selectFilterElements(2)
  //   filterRefinerPage.filter.addButton.click()
  //   cy.wait('@addFilters')
  //   filterRefinerPage.total.resultsListElement.countElements(2)
  //   filterRefinerPage.menu.undoButton.click()
  //   filterRefinerPage.total.resultsListElement.countElements(0)
  //   filterRefinerPage.menu.redoButton.click()
  //   cy.waitUntil(() =>
  //     filterRefinerPage.total.resultsListElement.element.should('be.visible'),
  //   )
  // })

  // it.skip('should apply every filter | step 15', () => {
  //   filterRefinerPage.visit(link)
  //   //there is no apply button
  // })

  function selectFilterElements(index: number) {
    filterRefinerPage.filter.filterElements
      .eq(index)
      .siblings(CommonSelectors.checkbox)
      .click()
  }

  function countAddedElements(numElements: number, contents: string) {
    filterRefinerPage.filter.addButton.click()
    filterRefinerPage.total.resultsListElement.countElements(numElements)
    filterRefinerPage.total.resultsListElement.contains(contents)
  }

  function selectElementInLeftPanel(name: string) {
    filterRefinerPage.leftPanel.listElements.element.contains(name).click()
  }
})
