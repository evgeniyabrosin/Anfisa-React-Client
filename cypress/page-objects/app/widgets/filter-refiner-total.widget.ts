import { Button } from '../../lib/button'
import { Checkbox } from '../../lib/checkbox'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface FilterRefinerTotalSelectors {
  applyButton: string
  rulesListElement: string
  rulesListCheckbox: string
  variantsNumber: string
}

export interface FilterRefinerTotalLabels {
  rulesListElement: string
  variantsNumber: string
}

export class FilterRefinerTotalWidget extends UIWidget {
  readonly applyButton: Button
  readonly rulesListElement: Label
  readonly rulesListCheckbox: Checkbox
  readonly variantsNumber: Label

  constructor(options: {
    selectors: FilterRefinerTotalSelectors
    labels: FilterRefinerTotalLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.applyButton = new Button(selectors.applyButton)
    this.rulesListElement = new Label(
      selectors.rulesListElement,
      labels.rulesListElement,
    )
    this.rulesListCheckbox = new Checkbox(selectors.rulesListCheckbox)
    this.variantsNumber = new Label(
      selectors.variantsNumber,
      labels.variantsNumber,
    )
  }
}
