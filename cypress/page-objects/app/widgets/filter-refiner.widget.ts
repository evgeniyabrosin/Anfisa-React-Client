import { Button } from '../../lib/button'
import { UIWidget } from '../../lib/ui-widget'

export interface FilterRefinerMenuSelectors {
  selectPreset: string
  saveDataset: string
}

export class FilterRefinerMenuWidget extends UIWidget {
  readonly selectPreset: Button
  readonly saveDataset: Button

  constructor(options: { selectors: FilterRefinerMenuSelectors }) {
    super(options)

    const selectors = options.selectors

    this.selectPreset = new Button(selectors.selectPreset)
    this.saveDataset = new Button(selectors.saveDataset)
  }
}
