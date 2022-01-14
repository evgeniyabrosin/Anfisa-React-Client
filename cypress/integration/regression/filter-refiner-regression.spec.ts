import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { filterRefinerPage } from '../../page-objects/app/filter-refiner-page'

describe('Filter refiner regression test | step 1', () => {
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'

  it('should search attribute via substring', () => {
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
})
