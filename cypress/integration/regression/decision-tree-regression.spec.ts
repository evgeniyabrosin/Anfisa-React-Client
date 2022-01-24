import { datasetPage } from '../../page-objects/app/datasets-page'
import { decisionTreesPage } from '../../page-objects/app/decision-trees-page'

describe('Regression test of the decision tree', () => {
  const includedVariants = '+5,041,176'
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'

  const stepDescription =
    ' \nif Compound_Request(request = [[1,  {"0": ["HG003", "HG004"], "1-2": ["HG002"]} ]]) in   :\n     return true'

  const inheritanceMode = 'Inheritance_Mode'
  const selectAll = 'Select All'
  const compoundRequest = 'Compound_Request'

  it('should open decision tree for XL dataset', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.haveText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()
    datasetPage.datasetInfo.datasetHeader.haveText(datasetName)
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.viewerOption.contains('Decision Tree Panel').click()
    cy.url().should('include', `/filter?ds=${datasetName}`)
  })
  it('should search attribute based on a substring', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders
      .eq(0)
      .should('have.text', 'Callers')
  })

  it('should select all attributes | step 3', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    cy.waitUntil(() =>
      decisionTreesPage.attributesList.selectAll.element.then(el => {
        return el.text() === selectAll
      }),
    )
    decisionTreesPage.attributesList.selectAll.contains(selectAll).click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
  })

  it('should join second attribute with first | step 4', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addInheritanceMode()
    cy.waitUntil(() =>
      decisionTreesPage.attributesList.problemGroup.element.should(
        'be.visible',
      ),
    )
    decisionTreesPage.attributesList.problemGroup.eq(3).click()
    decisionTreesPage.attributesList.addByJoin.click()
    decisionTreesPage.attributesList.joinByAnd.click()
    joinBy('AND')
  })

  it('should join third attribute by OR | step 5', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addInheritanceMode()
    cy.waitUntil(() =>
      decisionTreesPage.attributesList.problemGroup.element.should(
        'be.visible',
      ),
    )
    decisionTreesPage.attributesList.problemGroup.eq(3).click()
    decisionTreesPage.attributesList.addByJoin.click()
    decisionTreesPage.attributesList.joinByAnd.click()
    joinBy('AND')
    addInheritanceMode()
    cy.intercept('POST', 'app/dtree_stat').as('loadTree')
    decisionTreesPage.attributesList.problemGroup.eq(5).click()
    decisionTreesPage.attributesList.addByJoin.click()
    decisionTreesPage.attributesList.joinByOr.click()
    cy.wait('@loadTree')
    joinBy('OR')
  })

  it('should add step after | step 6', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
  })

  it('should add Min_GQ attributes to the second step | step 7', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
  })

  it('should add Max_GQ attributes to the second step | step 8', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .eq(1)
      .type('Min_GQ')
    decisionTreesPage.decisionTreeResults.stepCard
      .getChildren()
      .contains('Min_GQ')
    decisionTreesPage.decisionTreeResults.searchGraphResults.eq(1).clear()
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Max_GQ')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type('15')
    decisionTreesPage.decisionTreeResults.rightInput.type('99')
    decisionTreesPage.attributesList.replaceButton.click()
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .eq(1)
      .type('Max_GQ')
    decisionTreesPage.decisionTreeResults.stepCard
      .getChildren()
      .contains('Max_GQ')
  })

  it('should add third step | step 9', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    addThirdStep()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should add attributes to step 3 | step 10', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    addThirdStep()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(2).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Compound_Het')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.attributesList.problemGroup.first().click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
  })

  it('should delete step | step 12', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.eq(1).click()
    decisionTreesPage.decisionTreeResults.deleteStep.click()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(1)
  })

  it('should add attribute to third step | step 13', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    addThirdStep()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(2).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type(compoundRequest)
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.selectReset.select(
      'Autosomal Dominant',
    )
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .eq(1)
      .type(compoundRequest)
    decisionTreesPage.decisionTreeResults.stepCard.countElements(1)
  })

  it('should not add attribute if press cancel | step 14', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    addThirdStep()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(2).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Has_Variant')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.attributesList.problemGroup.eq(1).click()
    decisionTreesPage.decisionTreeResults.cancelButton.click()
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .eq(1)
      .type('Has_Variant')
    decisionTreesPage.decisionTreeResults.stepCard.countElements(0)
  })

  it('should not change attributes if cancel button is pressed | step 15', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    addThirdStep()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(2).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type(compoundRequest)
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.selectReset.select(
      'Autosomal Dominant',
    )
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeResults.gearButton.eq(2).click()
    decisionTreesPage.decisionTreeResults.addButton.click()
    decisionTreesPage.decisionTreeResults.selectReset.select('Compensational')
    decisionTreesPage.decisionTreeResults.cancelButton.click()
    cy.wait('@applyAttributes')
    decisionTreesPage.decisionTreeResults.contentEditor
      .eq(2)
      .should('have.text', stepDescription)
  })

  it('should collapse decision tree panel | step 17', () => {
    searchForCallers()
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    selectAllAttributes()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    addStepAfter()
    addMinGq('10', '100')
    addThirdStep()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(3)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(2).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type(compoundRequest)
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
  })

  function searchForCallers() {
    decisionTreesPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
  }

  function selectAllAttributes() {
    decisionTreesPage.attributesList.selectAll.contains(selectAll).click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
  }

  function addInheritanceMode() {
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type(inheritanceMode)
    cy.intercept('POST', '/app/statfunc').as('loadProblemGroup')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    cy.wait('@loadProblemGroup')
  }

  function addStepAfter() {
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
  }

  function addMinGq(min: string, max: string) {
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Min_GQ')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type(min)
    decisionTreesPage.decisionTreeResults.rightInput.type(max)
  }

  function joinBy(method: string) {
    decisionTreesPage.decisionTreeResults.joinByLabel
      .getChildren()
      .contains('Join by')
    decisionTreesPage.decisionTreeResults.joinByLabel
      .getChildren()
      .contains(method)
  }

  function addThirdStep() {
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.eq(1).click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
  }
})
