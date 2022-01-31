import { Button } from '../../lib/button'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface ReturnedVariantSelectors {
  returnedVariantsHeader: string
  sampleButton: string
  tableSection: string
}

export interface ReturnedVariantLabels {
  returnedVariantsHeader: string
}

export class ReturnedVariantWidget extends UIWidget {
  readonly sampleButton: Button
  readonly tableSection: Button
  readonly returnedVariantsHeader: Label

  constructor(options: {
    selectors: ReturnedVariantSelectors
    labels: ReturnedVariantLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.tableSection = new Button(selectors.tableSection)
    this.sampleButton = new Button(selectors.sampleButton)
    this.returnedVariantsHeader = new Label(
      selectors.returnedVariantsHeader,
      labels.returnedVariantsHeader,
    )
  }
}
