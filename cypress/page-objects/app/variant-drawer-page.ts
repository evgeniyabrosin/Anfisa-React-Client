import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { VariantDrawerDataCy } from '../../../src/components/data-testid/variant-drawer.cy'
import { BasePage } from '../lib/base-page'
import { VariantDrawerWidget } from './widgets/variant-drawer.widget'

class VariantDrawerPage extends BasePage {
  readonly variantDrawer: VariantDrawerWidget
  constructor() {
    super()
    this.variantDrawer = new VariantDrawerWidget({
      selectors: {
        addTag: `[data-testid = "${VariantDrawerDataCy.addTag}"]`,
        tagInput: `${CommonSelectors.tagInput}`,
        addCustomTag: `[data-testid = "${VariantDrawerDataCy.addCustomTag}"]`,
        tagCheckbox: `${CommonSelectors.checkbox}`,
        saveTags: `[data-testid = "${VariantDrawerDataCy.saveTags}"]`,
        addNote: `[data-testid = "${VariantDrawerDataCy.addNote}"]`,
        fillSpace: `${CommonSelectors.fillSpace}`,
        saveNote: `[data-testid = "${VariantDrawerDataCy.saveNote}"]`,
        addedTag: `[data-testid = "${VariantDrawerDataCy.addedTag}"]`,
      },
      labels: {
        addedTag: '',
      },
    })
  }
}
export const variantDrawerPage = new VariantDrawerPage()
