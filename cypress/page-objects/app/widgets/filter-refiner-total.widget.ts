import { Button } from '../../lib/button'
import { Checkbox } from '../../lib/checkbox'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface FilterRefinerTotalSelectors {
  applyButton: string
  resultsListElement: string
  resultsListCheckbox: string
  variantsNumber: string
}

export interface FilterRefinerTotalLabels {
  rulesListElement: string
  variantsNumber: string
}

export class FilterRefinerTotalWidget extends UIWidget {
  readonly applyButton: Button
  readonly resultsListElement: Label
  readonly resultsListCheckbox: Checkbox
  readonly variantsNumber: Label

  constructor(options: {
    selectors: FilterRefinerTotalSelectors
    labels: FilterRefinerTotalLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.applyButton = new Button(selectors.applyButton)
    this.resultsListElement = new Label(
      selectors.resultsListElement,
      labels.rulesListElement,
    )
    this.resultsListCheckbox = new Checkbox(selectors.resultsListCheckbox)
    this.variantsNumber = new Label(
      selectors.variantsNumber,
      labels.variantsNumber,
    )
  }
}
