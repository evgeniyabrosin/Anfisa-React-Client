import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { VariantDrawerDataCy } from '../../../src/components/data-testid/variant-drawer.cy'
import { BasePage } from '../lib/base-page'
import { Helper } from '../lib/helpers'
import { VariantDrawerWidget } from './widgets/variant-drawer.widget'

class VariantDrawerPage extends BasePage {
  readonly variantDrawer: VariantDrawerWidget
  constructor() {
    super()
    this.variantDrawer = new VariantDrawerWidget({
      selectors: {
        addTag: Helper.getDataId(VariantDrawerDataCy.addTag),
        tagInput: `${CommonSelectors.tagInput}`,
        addCustomTag: Helper.getDataId(VariantDrawerDataCy.addCustomTag),
        tagCheckbox: `${CommonSelectors.checkbox}`,
        saveTags: Helper.getDataId(VariantDrawerDataCy.saveTags),
        addNote: Helper.getDataId(VariantDrawerDataCy.addNote),
        fillSpace: `${CommonSelectors.fillSpace}`,
        saveNote: Helper.getDataId(VariantDrawerDataCy.saveNote),
        addedTag: Helper.getDataId(VariantDrawerDataCy.addedTag),
      },
      labels: {
        addedTag: '',
      },
    })
  }
}
export const variantDrawerPage = new VariantDrawerPage()
