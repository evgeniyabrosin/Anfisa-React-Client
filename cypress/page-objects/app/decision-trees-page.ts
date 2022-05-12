/* eslint-disable @typescript-eslint/no-use-before-define */
import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { DecisionTreesMenuDataCy } from '../../../src/components/data-testid/decision-tree-menu.cy'
import { DecisionTreeModalDataCy } from '../../../src/components/data-testid/decision-tree-modal.cy'
import { DecisionTreesResultsDataCy } from '../../../src/components/data-testid/decision-tree-results.cy'
import { Helper } from '../../shared/helpers'
import { BasePage } from '../lib/base-page'
import { AttributesListWidget } from './widgets/attributes-list.widget'
import { DecisionTreeChartWidget } from './widgets/decision-tree-chart.widget'
import { DecisionTreeWidget } from './widgets/decision-tree-menu.widget'
import { DecisionTreeResultsWidget } from './widgets/decision-tree-results.widget'

class DecisionTreesPage extends BasePage {
  readonly decisionTreeMenu: DecisionTreeWidget
  readonly decisionTreeResults: DecisionTreeResultsWidget
  readonly attributesList: AttributesListWidget
  readonly decisionTreeChart: DecisionTreeChartWidget
  constructor() {
    super()
    this.decisionTreeMenu = new DecisionTreeWidget({
      selectors: {
        selectDecision: `[aria-haspopup = "${DecisionTreesMenuDataCy.selectDecision}"]`,
        decisionActions: Helper.getDataId(
          DecisionTreesMenuDataCy.decisionActions,
        ),
        loadDecision: Helper.getDataId(DecisionTreesMenuDataCy.loadDecision),
        selectDropdownElem: Helper.getDataId(
          DecisionTreesMenuDataCy.selectDropdownElem,
        ),
        saveDataset: Helper.getDataId(DecisionTreesMenuDataCy.saveDataset),
        datasetNameInput: Helper.getDataId(
          DecisionTreesMenuDataCy.datasetNameInput,
        ),
        addNewDataset: Helper.getDataId(DecisionTreesMenuDataCy.addNewDataset),
        cancelAddNewDataset: Helper.getDataId(
          DecisionTreesMenuDataCy.cancelAddNewDataset,
        ),
        textEditor: Helper.getDataId(DecisionTreesMenuDataCy.textEditor),
        createNew: Helper.getDataId(DecisionTreesMenuDataCy.createNew),
        applyNewTree: Helper.getDataId(DecisionTreesMenuDataCy.applyNewTree),
        newDecisionTreeNameInput:
          DecisionTreesMenuDataCy.newDecisionTreeNameInput,
      },
      labels: {},
    })
    this.decisionTreeResults = new DecisionTreeResultsWidget({
      selectors: {
        searchGraphResults: Helper.getDataId(
          DecisionTreesResultsDataCy.searchGraphResults,
        ),
        searchStepsResults: Helper.getDataId(
          DecisionTreesResultsDataCy.searchStepsResults,
        ),
        groupGraphHeaders: Helper.getDataId(
          DecisionTreesResultsDataCy.groupGraphHeaders,
        ),
        graphHeaders: Helper.getDataId(DecisionTreesResultsDataCy.graphHeaders),
        stepCard: Helper.getDataId(DecisionTreesResultsDataCy.stepCard),
        excludeInfo: Helper.getDataId(DecisionTreesResultsDataCy.excludeInfo),
        viewReturnedVariants: Helper.getDataId(
          DecisionTreesResultsDataCy.viewReturnedVariants,
        ),
        treeTooltip: `${CommonSelectors.treeTooltip}`,
        addAttribute: Helper.getDataId(DecisionTreesResultsDataCy.addAttrbute),
        joinByLabel: Helper.getDataId(DecisionTreeModalDataCy.joinByLabel),
        optionsMenu: Helper.getDataId(DecisionTreesResultsDataCy.optionsMenu),
        addStepAfter: Helper.getDataId(DecisionTreesResultsDataCy.addStepAfter),
        deleteStep: Helper.getDataId(DecisionTreesResultsDataCy.deleteStep),
        leftInput: Helper.getDataId(DecisionTreeModalDataCy.leftInput),
        rightInput: Helper.getDataId(DecisionTreeModalDataCy.rightInput),
        selectReset: Helper.getDataId(DecisionTreeModalDataCy.selectReset),
        addButton: Helper.getDataId(DecisionTreeModalDataCy.addButton),
        removeButton: Helper.getDataId(DecisionTreeModalDataCy.removeButton),
        numberInput: Helper.getDataId(CommonSelectors.numberInput),
        cancelButton: Helper.getDataId(DecisionTreeModalDataCy.cancelButton),
        gearButton: Helper.getDataId(DecisionTreesResultsDataCy.gearButton),
        contentEditor: Helper.getDataId(
          DecisionTreesResultsDataCy.contentEditor,
        ),
        expandAll: Helper.getDataId(DecisionTreesResultsDataCy.expandAll),
        collapseAll: Helper.getDataId(DecisionTreesResultsDataCy.collapseAll),
        modalHeader: Helper.getDataId(DecisionTreeModalDataCy.modalHeader),
        anyChangeAlert: CommonSelectors.anyChangeAlert,
      },
      labels: {
        graphHeaders: '',
        groupGraphHeaders: 'Variant',
        stepCard: 'header3',
        treeTooltip: 'Show excluded variants for step 5',
        joinByLabel: 'Join by AND',
        contentEditor: '',
        modalHeader: 'Edit current Decision Tree code',
        anyChangeAlert: '',
      },
    })
    this.attributesList = new AttributesListWidget({
      selectors: {
        searchForAttr: Helper.getDataId(
          DecisionTreesResultsDataCy.searchForAttr,
        ),
        selectAll: Helper.getDataId(
          DecisionTreeModalDataCy.selectAllFromAttribute,
        ),
        addSelectedAttributes: Helper.getDataId(
          DecisionTreeModalDataCy.addSelectedAttributes,
        ),
        addByJoin: Helper.getDataId(DecisionTreeModalDataCy.addByJoin),
        problemGroup: CommonSelectors.checkbox,
        joinByAnd: Helper.getDataId(DecisionTreeModalDataCy.joinByAnd),
        joinByOr: Helper.getDataId(DecisionTreeModalDataCy.joinByOr),
        replaceButton: Helper.getDataId(DecisionTreeModalDataCy.replaceButton),
        variantsList: Helper.getDataId(DecisionTreesResultsDataCy.variantsList),
      },
      labels: {
        variantsList: '',
      },
    })
    this.decisionTreeChart = new DecisionTreeChartWidget({
      selectors: {
        dataCharts: CommonSelectors.dataCharts,
      },
      labels: {
        dataCharts: '',
      },
    })
  }
  searchForCallers(datasetName: string): void {
    decisionTreesPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
  }

  selectAllAttributes(selectAll: string): void {
    decisionTreesPage.attributesList.selectAll.contains(selectAll).click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes')
  }

  addStepAfter(elementNumber: number) {
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.eq(elementNumber).click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
  }

  addMinGq(min: string, max: string) {
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Min_GQ')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type(min)
    decisionTreesPage.decisionTreeResults.rightInput.type(max)
  }
}

export const decisionTreesPage = new DecisionTreesPage()
