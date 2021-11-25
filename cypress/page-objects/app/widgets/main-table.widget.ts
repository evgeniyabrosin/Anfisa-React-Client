import { Button } from '../../lib/button'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface MainTableSelectors {
  mainTableHeader: string
  sampleButton: string
  tableSection: string
}

export interface MainTableLabels {
  mainTableHeader: string
}

export class MainTableWidget extends UIWidget {
  readonly sampleButton: Button
  readonly tableSection: Button
  readonly mainTableHeader: Label

  constructor(options: {
    selectors: MainTableSelectors
    labels: MainTableLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.tableSection = new Button(selectors.tableSection)
    this.sampleButton = new Button(selectors.sampleButton)
    this.mainTableHeader = new Label(
      selectors.mainTableHeader,
      labels.mainTableHeader,
    )
  }
}
