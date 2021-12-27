/* eslint-disable @typescript-eslint/no-empty-interface */
import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { UIWidget } from '../../lib/ui-widget'

export interface DecisionTreeMenuSelectors {
  selectDecision: string
  decisionActions: string
  loadDecision: string
  selectDropdownElem: string
  saveDataset: string
  datasetNameInput: string
  addNewDataset: string
  cancelAddNewDataset: string
}

export interface DecisionTreeLabels {}

export class DecisionTreeWidget extends UIWidget {
  readonly selectDecision: Button
  readonly decisionActions: Button
  readonly loadDecision: Button
  readonly selectDropdownElem: Button
  readonly saveDataset: Button
  readonly datasetNameInput: Input
  readonly addNewDataset: Button
  readonly cancelAddNewDataset: Button

  constructor(options: {
    selectors: DecisionTreeMenuSelectors
    labels: DecisionTreeLabels
  }) {
    super(options)

    const selectors = options.selectors

    this.selectDecision = new Button(selectors.selectDecision)
    this.decisionActions = new Button(selectors.decisionActions)
    this.loadDecision = new Button(selectors.loadDecision)
    this.selectDropdownElem = new Button(selectors.selectDropdownElem)
    this.saveDataset = new Button(selectors.saveDataset)
    this.datasetNameInput = new Input(selectors.datasetNameInput)
    this.addNewDataset = new Button(selectors.addNewDataset)
    this.cancelAddNewDataset = new Button(selectors.cancelAddNewDataset)
  }
}