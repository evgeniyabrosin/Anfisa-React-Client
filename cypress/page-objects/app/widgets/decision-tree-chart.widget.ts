import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface DecisionTreeChartSelectors {
  dataCharts: string
}

export interface DecisionTreeChartLabels {
  dataCharts: string
}

export class DecisionTreeChartWidget extends UIWidget {
  readonly dataCharts: Label
  constructor(options: {
    selectors: DecisionTreeChartSelectors
    labels: DecisionTreeChartLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.dataCharts = new Label(selectors.dataCharts, labels.dataCharts)
  }
}
