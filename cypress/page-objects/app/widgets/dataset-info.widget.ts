import { Button } from '../../lib/button'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface DatasetInfoSelectors {
  openInViewer: string
  decTreePanel: string
  datasetHeader: string
}

export interface DatasetInfoLabels {
  datasetHeader: string
}

export class DatasetInfoWidget extends UIWidget {
  readonly openInViewer: Button
  readonly decTreePanel: Button
  readonly datasetHeader: Label

  constructor(options: {
    selectors: DatasetInfoSelectors
    labels: DatasetInfoLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.openInViewer = new Button(selectors.openInViewer)
    this.decTreePanel = new Button(selectors.decTreePanel)

    this.datasetHeader = new Label(
      selectors.datasetHeader,
      labels.datasetHeader,
    )
  }
}
