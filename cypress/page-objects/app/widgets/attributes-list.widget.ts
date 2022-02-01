import { Button } from '../../lib/button'
import { Checkbox } from '../../lib/checkbox'
import { Input } from '../../lib/input'
import { Label } from '../../lib/label'
import { UIWidget } from '../../lib/ui-widget'

export interface AttributesListSelectors {
  searchForAttr: string
  selectAll: string
  addSelectedAttributes: string
  addByJoin: string
  problemGroup: string
  joinByAnd: string
  joinByOr: string
  replaceButton: string
  variantsList: string
}
export interface AttributesListLabels {
  variantsList: string
}
export class AttributesListWidget extends UIWidget {
  readonly searchForAttr: Input
  readonly selectAll: Button
  readonly addSelectedAttributes: Button
  readonly addByJoin: Button
  readonly problemGroup: Checkbox
  readonly joinByAnd: Button
  readonly joinByOr: Button
  readonly replaceButton: Button
  readonly variantsList: Label

  constructor(options: {
    selectors: AttributesListSelectors
    labels: AttributesListLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.searchForAttr = new Input(selectors.searchForAttr)
    this.selectAll = new Button(selectors.selectAll)
    this.addSelectedAttributes = new Button(selectors.addSelectedAttributes)
    this.addByJoin = new Button(selectors.addByJoin)
    this.problemGroup = new Checkbox(selectors.problemGroup)
    this.joinByAnd = new Button(selectors.joinByAnd)
    this.joinByOr = new Button(selectors.joinByOr)
    this.replaceButton = new Button(selectors.replaceButton)
    this.variantsList = new Label(selectors.variantsList, labels.variantsList)
  }
}
