import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { DecisionTreesMenuDataCy } from '../../../src/components/data-testid/decision-tree-menu.cy'
import { DecisionTreesResultsDataCy } from '../../../src/components/data-testid/decision-tree-results.cy'
import { BasePage } from '../lib/base-page'
import { DecisionTreeWidget } from './widgets/decision-tree-menu.widget'
import { DecisionTreeResultsWidget } from './widgets/decision-tree-results.widget'

class DecisionTreesPage extends BasePage {
  readonly decisionTreeMenu: DecisionTreeWidget
  readonly decisionTreeResults: DecisionTreeResultsWidget
  constructor() {
    super()
    this.decisionTreeMenu = new DecisionTreeWidget({
      selectors: {
        selectDecision: `[aria-haspopup = "${DecisionTreesMenuDataCy.selectDecision}"]`,
        decisionActions: `[data-testid = "${DecisionTreesMenuDataCy.decisionActions}"]`,
        loadDecision: `[data-testid = "${DecisionTreesMenuDataCy.loadDecision}"]`,
        selectDropdownElem: `[data-testid = "${DecisionTreesMenuDataCy.selectDropdownElem}"]`,
        saveDataset: `[data-testid = "${DecisionTreesMenuDataCy.saveDataset}"]`,
        datasetNameInput: `[data-testid = "${DecisionTreesMenuDataCy.datasetNameInput}"]`,
        addNewDataset: `[data-testid = "${DecisionTreesMenuDataCy.addNewDataset}"]`,
        cancelAddNewDataset: `[data-testid = "${DecisionTreesMenuDataCy.cancelAddNewDataset}"]`,
      },
      labels: {},
    })
    this.decisionTreeResults = new DecisionTreeResultsWidget({
      selectors: {
        searchGraphResults: `[data-testid = "${DecisionTreesResultsDataCy.searchGraphResults}"]`,
        searchStepsResults: `[data-testid = "${DecisionTreesResultsDataCy.searchStepsResults}"]`,
        groupGraphHeaders: `[data-testid = "${DecisionTreesResultsDataCy.groupGraphHeaders}" ]`,
        graphHeaders: `[data-testid = "${DecisionTreesResultsDataCy.graphHeaders}"]`,
        stepCard: `[data-testid = "${DecisionTreesResultsDataCy.stepCard}"]`,
        excludeInfo: `[data-testid = "${DecisionTreesResultsDataCy.excludeInfo}"]`,
        viewReturnedVariants: `[data-testid = "${DecisionTreesResultsDataCy.viewReturnedVariants}"]`,
        treeTooltip: `${CommonSelectors.treeTooltip}`,
        addAttribute: `[data-testid = "${DecisionTreesResultsDataCy.addAttrbute}"]`,
        searchForAttr: `[data-testid = "${DecisionTreesResultsDataCy.searchForAttr}"]`,
        selectAll: `${CommonSelectors.selectAll}`,
      },
      labels: {
        graphHeaders: '',
        groupGraphHeaders: 'Variant',
        stepCard: 'header3',
        treeTooltip: 'Show excluded varants for step 5',
      },
    })
  }
}
export const decisionTreesPage = new DecisionTreesPage()
