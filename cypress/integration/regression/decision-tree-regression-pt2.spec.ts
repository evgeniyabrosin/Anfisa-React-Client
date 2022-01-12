/* eslint-disable no-undef */
import { decisionTreesPage } from '../../page-objects/app/decision-trees-page'

describe('Regression test of the decision tree', () => {
  const includedVariants = '+5041176'

  it('should expand all | step 18', () => {
    decisionTreesPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.attributesList.selectAll.contains('Select All').click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Min_GQ')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type('10')
    decisionTreesPage.decisionTreeResults.rightInput.type('100')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.eq(1).click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(2).click()
    decisionTreesPage.attributesList.searchForAttr
      .eq(0)
      .type('Compound_Request')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.selectReset.select(
      'Autosomal Dominant',
    )
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes')
    decisionTreesPage.decisionTreeResults.collapseAll.eq(1).click()
    decisionTreesPage.decisionTreeResults.contentEditor.element.should(
      'not.exist',
    )
    decisionTreesPage.decisionTreeResults.expandAll.eq(1).click()
    decisionTreesPage.decisionTreeResults.contentEditor.element.should('exist')
  })
  it('should collapse charts | step 20', () => {
    decisionTreesPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.attributesList.selectAll.contains('Select All').click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    decisionTreesPage.decisionTreeResults.collapseAll.first().click()
    decisionTreesPage.decisionTreeChart.dataCharts.element.should('not.exist')
  })
})
