import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { Label } from '../../lib/label'
import { StepLabel } from '../../lib/stepLabel'
import { UIWidget } from '../../lib/ui-widget'

export interface DecisionTreeResultsSelectors {
  searchGraphResults: string
  graphHeaders: string
  searchStepsResults: string
  groupGraphHeaders: string
  stepCard: string
  excludeInfo: string
  viewReturnedVariants: string
  treeTooltip: string
  addAttribute: string
  joinByLabel: string
  optionsMenu: string
  addStepAfter: string
  leftInput: string
  rightInput: string
}

export interface DecisionTreeResultsLabels {
  graphHeaders: string
  groupGraphHeaders: string
  stepCard: string
  treeTooltip: string
  joinByLabel: string
}

export class DecisionTreeResultsWidget extends UIWidget {
  readonly searchGraphResults: Input
  readonly graphHeaders: Label
  readonly searchStepsResults: Input
  readonly groupGraphHeaders: Label
  readonly stepCard: StepLabel
  readonly excludeInfo: Button
  readonly viewReturnedVariants: Button
  readonly treeToolptip: Label
  readonly addAttribute: Button
  readonly joinByLabel: Label
  readonly optionsMenu: Button
  readonly addStepAfter: Button
  readonly leftInput: Input
  readonly rightInput: Input

  constructor(options: {
    selectors: DecisionTreeResultsSelectors
    labels: DecisionTreeResultsLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.searchGraphResults = new Input(selectors.searchGraphResults)
    this.searchStepsResults = new Input(selectors.searchStepsResults)
    this.groupGraphHeaders = new Label(
      selectors.groupGraphHeaders,
      labels.graphHeaders,
    )
    this.graphHeaders = new Label(
      selectors.graphHeaders,
      labels.groupGraphHeaders,
    )
    this.stepCard = new StepLabel(selectors.stepCard, labels.stepCard)
    this.excludeInfo = new Button(selectors.excludeInfo)
    this.viewReturnedVariants = new Button(selectors.viewReturnedVariants)
    this.treeToolptip = new Label(selectors.treeTooltip, labels.treeTooltip)
    this.addAttribute = new Button(selectors.addAttribute)
    this.joinByLabel = new Label(selectors.joinByLabel, labels.joinByLabel)
    this.optionsMenu = new Button(selectors.optionsMenu)
    this.addStepAfter = new Button(selectors.addStepAfter)
    this.leftInput = new Input(selectors.leftInput)
    this.rightInput = new Input(selectors.rightInput)
  }
}
