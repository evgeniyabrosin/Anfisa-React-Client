/* eslint-disable @typescript-eslint/no-empty-interface */
import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { Label } from '../../lib/label'
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
  textEditor: string
  createNew: string
  applyNewTree: string
  newDecisionTreeNameInput: string
  placeHolder: string
}

export interface DecisionTreeLabels {
  placeHolder: string
}

export class DecisionTreeWidget extends UIWidget {
  readonly selectDecision: Button
  readonly decisionActions: Button
  readonly loadDecision: Button
  readonly selectDropdownElem: Button
  readonly saveDataset: Button
  readonly datasetNameInput: Input
  readonly addNewDataset: Button
  readonly cancelAddNewDataset: Button
  readonly textEditor: Button
  readonly createNew: Button
  readonly applyNewTree: Button
  readonly newDecisionTreeNameInput: Input
  readonly placeHolder: Label

  constructor(options: {
    selectors: DecisionTreeMenuSelectors
    labels: DecisionTreeLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.selectDecision = new Button(selectors.selectDecision)
    this.decisionActions = new Button(selectors.decisionActions)
    this.loadDecision = new Button(selectors.loadDecision)
    this.selectDropdownElem = new Button(selectors.selectDropdownElem)
    this.saveDataset = new Button(selectors.saveDataset)
    this.datasetNameInput = new Input(selectors.datasetNameInput)
    this.addNewDataset = new Button(selectors.addNewDataset)
    this.cancelAddNewDataset = new Button(selectors.cancelAddNewDataset)
    this.textEditor = new Button(selectors.textEditor)
    this.createNew = new Button(selectors.createNew)
    this.applyNewTree = new Button(selectors.applyNewTree)
    this.newDecisionTreeNameInput = new Input(
      selectors.newDecisionTreeNameInput,
    )
    this.placeHolder = new Label(selectors.placeHolder, labels.placeHolder)
  }
}
