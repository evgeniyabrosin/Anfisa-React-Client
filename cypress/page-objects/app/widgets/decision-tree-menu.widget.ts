/* eslint-disable @typescript-eslint/no-empty-interface */
import { Button } from '../../lib/button'
import { UIWidget } from '../../lib/ui-widget'

export interface DecisionTreeMenuSelectors {
  selectDecision: string
  decisionActions: string
  loadDecision: string
  selectDropdownElem: string
}

export interface DecisionTreeLabels {}

export class DecisionTreeWidget extends UIWidget {
  readonly selectDecision: Button
  readonly decisionActions: Button
  readonly loadDecision: Button
  readonly selectDropdownElem: Button

  constructor(options: {
    selectors: DecisionTreeMenuSelectors
    labels: DecisionTreeLabels
  }) {
    super(options)

    const selectors = options.selectors
    //conts labels = options.labels

    this.selectDecision = new Button(selectors.selectDecision)
    this.decisionActions = new Button(selectors.decisionActions)
    this.loadDecision = new Button(selectors.loadDecision)
    this.selectDropdownElem = new Button(selectors.selectDropdownElem)
  }
}
