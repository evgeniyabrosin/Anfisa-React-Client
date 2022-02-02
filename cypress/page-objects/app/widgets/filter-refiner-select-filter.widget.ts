import { Button } from '../../lib/button'
import { Checkbox } from '../../lib/checkbox'
import { Input } from '../../lib/input'
import { Label } from '../../lib/label'
import { Select } from '../../lib/select'
import { UIWidget } from '../../lib/ui-widget'

export interface FilterRefinerFilterSelectors {
  filterHeader: string
  filterElements: string
  filterElementsCheckbox: string
  addButton: string
  clearButton: string
  noProblemGroupSelected: string
  problemGroup: string
  geneName: string
  selectReset: string
  redMessage: string
  removeButton: string
  inputNumberSamples: string
  inputText: string
  approxDropdown: string
}

export interface FilterRefinerFilterLabels {
  filterHeader: string
  filterElements: string
  noProblemGroupSelected: string
  problemGroup: string
  geneName: string
  redMessage: string
}

export class FilterRefinerFilterWidget extends UIWidget {
  readonly filterHeader: Label
  readonly filterElements: Label
  readonly filterElementsCheckbox: Checkbox
  readonly addButton: Button
  readonly clearButton: Button
  readonly noProblemGroupSelected: Label
  readonly problemGroup: Label
  readonly geneName: Label
  readonly selectReset: Select
  readonly redMessage: Label
  readonly removeButton: Button
  readonly inputNumberSamples: Input
  readonly inputText: Input
  readonly approxDropdown: Button

  constructor(options: {
    selectors: FilterRefinerFilterSelectors
    labels: FilterRefinerFilterLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.filterHeader = new Label(selectors.filterHeader, labels.filterHeader)
    this.filterElements = new Label(
      selectors.filterElements,
      labels.filterElements,
    )
    this.filterElementsCheckbox = new Checkbox(selectors.filterElementsCheckbox)
    this.addButton = new Button(selectors.addButton)
    this.clearButton = new Button(selectors.clearButton)
    this.noProblemGroupSelected = new Label(
      selectors.noProblemGroupSelected,
      labels.noProblemGroupSelected,
    )
    this.problemGroup = new Label(selectors.problemGroup, labels.problemGroup)
    this.geneName = new Label(selectors.geneName, labels.geneName)
    this.selectReset = new Select(selectors.selectReset)
    this.redMessage = new Label(selectors.redMessage, labels.redMessage)
    this.removeButton = new Button(selectors.removeButton)
    this.inputNumberSamples = new Input(selectors.inputNumberSamples)
    this.inputText = new Input(selectors.inputText)
    this.approxDropdown = new Button(selectors.approxDropdown)
  }
}
