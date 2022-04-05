import { ReturnedVariantsDataCy } from '../../../src/components/data-testid/returned-variants'
import { BasePage } from '../lib/base-page'
import { ReturnedVariantWidget } from './widgets/returned-variants.widget'

class ReturnedVariantsPage extends BasePage {
  readonly returnedVariantsTable: ReturnedVariantWidget
  constructor() {
    super()
    this.returnedVariantsTable = new ReturnedVariantWidget({
      selectors: {
        sampleButton: `[data-testid = "${ReturnedVariantsDataCy.sampleButton}"]`,
        tableSection: '[data-grid="[object Object]"]',
        returnedVariantsHeader: `[data-testid = "${ReturnedVariantsDataCy.returnedVariantsHeader}"]`,
      },
      labels: {
        returnedVariantsHeader: 'returnedVariantsHeader',
      },
    })
  }
}
export const returnedVariantsPage = new ReturnedVariantsPage()
