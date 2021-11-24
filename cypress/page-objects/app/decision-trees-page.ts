import { DecisionTreesMenuDataCy } from '../../../src/components/data-testid/decision-tree-menu.cy'
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
      },
      labels: {},
    })
    this.decisionTreeResults = new DecisionTreeResultsWidget({
      selectors: {
        searchGraphResults: `[data-testid = ]`,
        searchStepsResults: `[data-testid = ]`,
        groupGraphHeaders: `[data-testid = "group-header" ]`,
        graphHeaders: `[data-testid = ]`,
        stepCard: `[data-testid = "step-card"]`,
        excludeInfo: `[data-testid = "exclude-info"]`,
      },
      labels: {
        graphHeaders: '',
        groupGraphHeaders: 'Variant',
        stepCard: 'header3',
      },
    })
  }
}
export const decisionTreesPage = new DecisionTreesPage()
