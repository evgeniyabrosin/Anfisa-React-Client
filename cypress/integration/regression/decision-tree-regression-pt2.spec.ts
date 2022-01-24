import { datasetPage } from '../../page-objects/app/datasets-page'
import { decisionTreesPage } from '../../page-objects/app/decision-trees-page'
import { Timeouts } from '../../page-objects/lib/timeouts.cy'

describe('Regression test of the decision tree', () => {
  const includedVariants = '+5,041,176'
  const datasetName = 'xl_PGP3140_wgs_NIST-4_2'
  const filterName = '⏚Hearing Loss, v.5'
  const decisionTreeName = 'new_decision_tree'

  it('should expand all | step 18', () => {
    searchForCallers()
    selectAllAttributes()
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    addStepAfter(0)
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Min_GQ')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type('10')
    decisionTreesPage.decisionTreeResults.rightInput.type('100')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@stepAfter')
    addStepAfter(1)
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
    searchForCallers()
    selectAllAttributes()
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    decisionTreesPage.decisionTreeResults.collapseAll.first().click()
    decisionTreesPage.decisionTreeChart.dataCharts.element.should('not.exist')
  })
  it('should expand collapsed charts | step 21', () => {
    searchForCallers()
    selectAllAttributes()
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    decisionTreesPage.decisionTreeResults.collapseAll.first().click()
    decisionTreesPage.decisionTreeChart.dataCharts.element.should('not.exist')
    decisionTreesPage.decisionTreeResults.expandAll.first().click()
    decisionTreesPage.decisionTreeChart.dataCharts.element.should('exist')
  })

  it('should open text editor | step 22', () => {
    searchForCallers()
    selectAllAttributes()
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    decisionTreesPage.decisionTreeMenu.textEditor.click()
    decisionTreesPage.decisionTreeResults.modalHeader.element.should(
      'be.visible',
    )
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should save dataset and open it in main table | step 23', () => {
    decisionTreesPage.visit(`/filter?ds=${datasetName}`)
    // decisionTreesPage.decisionTreeResults.addAttribute.click()
    // decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
    // decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    // decisionTreesPage.attributesList.selectAll.contains('Select All').click()
    // cy.intercept('POST', '/app/statunits').as('applyAttributes')
    // decisionTreesPage.attributesList.addSelectedAttributes.click()
    // cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    // decisionTreesPage.decisionTreeResults.excludeInfo
    //   .first()
    //   .should('have.text', includedVariants)
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    // addStepAfter(0)
    // decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    // decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList', {
      timeout: Timeouts.TenSecondsTimeout,
    })
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    cy.wait('@decTreeUpload', {
      timeout: Timeouts.TenSecondsTimeout,
    })
    decisionTreesPage.decisionTreeMenu.saveDataset.click()
    decisionTreesPage.decisionTreeMenu.saveDataset.click()
    decisionTreesPage.decisionTreeMenu.datasetNameInput.type('regression_test')
    decisionTreesPage.decisionTreeMenu.addNewDataset.click()
  })

  it('should open decision tree panel | step 24', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()
    datasetPage.datasetInfo.datasetHeader.haveText(datasetName)
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.viewerOption.contains('Decision Tree Panel').click()
    cy.url().should('include', `/filter?ds=${datasetName}`)
  })

  it('should apply decision tree preset | step 25', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    decisionTreesPage.decisionTreeResults.stepCard.countElements(18)
    cy.wait('@decTreeUpload')
  })

  it('should show changes made in decision tree | step 26', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(filterName)
    decisionTreesPage.decisionTreeResults.stepCard.countElements(18)
    cy.wait('@decTreeUpload')
    decisionTreesPage.decisionTreeResults.addAttribute.first().click()
    decisionTreesPage.attributesList.searchForAttr
      .eq(0)
      .type('Compound_Request')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.selectReset.select(
      'Homozygous Recessive/X-linked',
    )
    decisionTreesPage.attributesList.replaceButton.click()
    cy.wait('@decTreeUpload')
    decisionTreesPage.decisionTreeResults.searchGraphResults
      .eq(1)
      .type('Compound_Request')
    decisionTreesPage.decisionTreeResults.stepCard.countElements(1)
  })

  it('should create new decision tree | step 27', () => {
    searchForCallers()
    selectAllAttributes()
    decisionTreesPage.decisionTreeMenu.createNew.click()
    decisionTreesPage.decisionTreeMenu.newDecisionTreeNameInput.type(
      `${decisionTreeName}`,
    )
    cy.intercept('POST', '/app/dtree_stat').as('createNewTree')
    decisionTreesPage.decisionTreeMenu.applyNewTree.click()
    cy.wait('@createNewTree')
    decisionTreesPage.decisionTreeResults.anyChangeAlert.element.within(
      $popup => {
        cy.wrap($popup).should(
          'have.text',
          `Decision Tree "${decisionTreeName}" has been created`,
        )
      },
    )
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    decisionTreesPage.decisionTreeMenu.selectDecision.element.should(
      'contain',
      decisionTreeName,
    )
  })

  it('should modify created decision tree | step 28', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList')
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      decisionTreeName,
    )
    cy.wait('@decTreeUpload')
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    addStepAfter(0)
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Min_GQ')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type('10')
    decisionTreesPage.decisionTreeResults.rightInput.type('100')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@stepAfter')
    decisionTreesPage.decisionTreeMenu.decisionActions.click()
    cy.intercept('POST', '/app/dtree_stat').as('modifyTree')
    decisionTreesPage.decisionTreeMenu.selectDropdownElem
      .contains('Modify')
      .click()
    decisionTreesPage.decisionTreeMenu.applyNewTree.click()
    cy.wait('@modifyTree')
    decisionTreesPage.decisionTreeResults.anyChangeAlert.element.within(
      $popup => {
        cy.wrap($popup).should(
          'have.text',
          `Decision Tree "${decisionTreeName}" has been modified`,
        )
      },
    )
  })

  it('should delete created decision tree | step 29', () => {
    datasetPage.visit(`/filter?ds=${datasetName}`)
    cy.intercept('POST', '/app/dtree_set').as('selectList')
    decisionTreesPage.decisionTreeMenu.selectDecision.first().click()
    cy.wait('@selectList')
    cy.intercept('POST', '/app/statunits').as('decTreeUpload')
    decisionTreesPage.decisionTreeMenu.selectDecision.getFilter(
      decisionTreeName,
    )
    cy.wait('@decTreeUpload')
    decisionTreesPage.decisionTreeMenu.decisionActions.click()
    cy.intercept('POST', '/app/dtree_stat').as('deleteTree')
    decisionTreesPage.decisionTreeMenu.selectDropdownElem
      .contains('Delete')
      .click()
    decisionTreesPage.decisionTreeMenu.applyNewTree.click()
    cy.wait('@deleteTree')
    decisionTreesPage.decisionTreeResults.anyChangeAlert.element.within(
      $popup => {
        cy.wrap($popup).should(
          'have.text',
          `Decision Tree "${decisionTreeName}" has been deleted`,
        )
      },
    )
    decisionTreesPage.decisionTreeMenu.selectDecision.element
      .contains(decisionTreeName)
      .should('not.exist')
  })

  function searchForCallers() {
    decisionTreesPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
  }

  function selectAllAttributes() {
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.attributesList.selectAll.contains('Select All').click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
  }

  function addStepAfter(elementNumber: number) {
    decisionTreesPage.decisionTreeResults.optionsMenu.eq(elementNumber).click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
  }
})
