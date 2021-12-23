import { Button } from '../../lib/button'
import { Checkbox } from '../../lib/checkbox'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface FilterRefinerFilterSelectors {
  filterHeader: string
  filterElements: string
  filterElementsCheckbox: string
  addButton: string
  clearButton: string
}

export interface FilterRefinerFilterLabels {
  filterHeader: string
  filterElements: string
}

export class FilterRefinerFilterWidget extends UIWidget {
  readonly filterHeader: Label
  readonly filterElements: Label
  readonly filterElementsCheckbox: Checkbox
  readonly addButton: Button
  readonly clearButton: Button

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
  }
}
