import { Button } from '../../lib/button'
import { UIWidget } from '../../lib/ui-widget'

export interface MainTableSelectors {
  selectPreset: string
  preset: string
  addSample: string
  applyButton: string
  cancelButton: string
}

export class MainTableWidget extends UIWidget {
  readonly selectPreset: Button
  readonly preset: Button
  readonly addSample: Button
  readonly applyButton: Button
  readonly cancelButton: Button

  constructor(options: { selectors: MainTableSelectors }) {
    super(options)

    const selectors = options.selectors

    this.selectPreset = new Button(selectors.selectPreset)
    this.preset = new Button(selectors.preset)
    this.addSample = new Button(selectors.addSample)
    this.applyButton = new Button(selectors.applyButton)
    this.cancelButton = new Button(selectors.cancelButton)
  }
}
