import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { UIWidget } from '../../lib/ui-widget'

export interface FilterRefinerLeftPanelSelectors {
  searchField: string
  listElements: string
}

export class FilterRefinerLeftPanelWidget extends UIWidget {
  readonly searchField: Input
  readonly listElements: Button

  constructor(options: { selectors: FilterRefinerLeftPanelSelectors }) {
    super(options)

    const selectors = options.selectors

    this.searchField = new Input(selectors.searchField)
    this.listElements = new Button(selectors.listElements)
  }
}
