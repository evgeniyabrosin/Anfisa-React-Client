import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { Label } from '../../lib/label'
import { MainTableCheckbox } from '../../lib/main-table-checkbox'
import { UIWidget } from '../../lib/ui-widget'

export interface VariantDrawerSelectors {
  addTag: string
  tagInput: string
  addCustomTag: string
  tagCheckbox: string
  saveTags: string
  addNote: string
  fillSpace: string
  saveNote: string
  addedTag: string
}
export interface VariantDrawerLabels {
  addedTag: string
}

export class VariantDrawerWidget extends UIWidget {
  readonly addTag: Button
  readonly tagInput: Input
  readonly addCustomTag: Button
  readonly tagCheckbox: MainTableCheckbox
  readonly saveTags: Button
  readonly addNote: Button
  readonly fillSpace: Input
  readonly saveNote: Button
  readonly addedTag: Label

  constructor(options: {
    selectors: VariantDrawerSelectors
    labels: VariantDrawerLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.addTag = new Button(selectors.addTag)
    this.tagInput = new Input(selectors.tagInput)
    this.addCustomTag = new Button(selectors.addCustomTag)
    this.tagCheckbox = new MainTableCheckbox(selectors.tagCheckbox)
    this.saveTags = new Button(selectors.saveTags)
    this.addNote = new Button(selectors.addNote)
    this.fillSpace = new Input(selectors.fillSpace)
    this.saveNote = new Button(selectors.saveNote)
    this.addedTag = new Label(selectors.addedTag, labels.addedTag)
  }
}
