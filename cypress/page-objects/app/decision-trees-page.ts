import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { DecisionTreesMenuDataCy } from '../../../src/components/data-testid/decision-tree-menu.cy'
import { DecisionTreesResultsDataCy } from '../../../src/components/data-testid/decision-tree-results.cy'
import { DecisionTreeMinGQ } from '../../../src/components/data-testid/min-gq.cy'
import { BasePage } from '../lib/base-page'
import { Helper } from '../lib/helpers'
import { AttributesListWidget } from './widgets/attributes-list.widget'
import { DecisionTreeWidget } from './widgets/decision-tree-menu.widget'
import { DecisionTreeResultsWidget } from './widgets/decision-tree-results.widget'

class DecisionTreesPage extends BasePage {
  readonly decisionTreeMenu: DecisionTreeWidget
  readonly decisionTreeResults: DecisionTreeResultsWidget
  readonly attributesList: AttributesListWidget
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
        joinByLabel: Helper.getDataId(DecisionTreesResultsDataCy.joinByLabel),
        optionsMenu: Helper.getDataId(DecisionTreesResultsDataCy.optionsMenu),
        addStepAfter: Helper.getDataId(DecisionTreesResultsDataCy.addStepAfter),
        leftInput: Helper.getDataId(DecisionTreeMinGQ.leftInput),
        rightInput: Helper.getDataId(DecisionTreeMinGQ.rightInput),
      },
      labels: {
        graphHeaders: '',
        groupGraphHeaders: 'Variant',
        stepCard: 'header3',
        treeTooltip: 'Show excluded varants for step 5',
        joinByLabel: 'Join by AND',
      },
    })
    this.attributesList = new AttributesListWidget({
      selectors: {
        searchForAttr: Helper.getDataId(
          DecisionTreesResultsDataCy.searchForAttr,
        ),
        selectAll: Helper.getDataId(
          DecisionTreesResultsDataCy.selectAllFromAttribute,
        ),
        addSelectedAttributes: Helper.getDataId(
          DecisionTreesResultsDataCy.addSelectedAttributes,
        ),
        addByJoin: Helper.getDataId(DecisionTreesResultsDataCy.addByJoin),
        problemGroup: CommonSelectors.checkbox,
        joinByAnd: Helper.getDataId(DecisionTreesResultsDataCy.joinByAnd),
        joinByOr: Helper.getDataId(DecisionTreesResultsDataCy.joinByOr),
      },
    })
  }
}

export const decisionTreesPage = new DecisionTreesPage()
