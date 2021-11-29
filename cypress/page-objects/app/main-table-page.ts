import { MainTableDataCy } from '../../../src/components/data-testid/main-table.cy'
import { BasePage } from '../lib/base-page'
import { MainTableWidget } from './widgets/main-table.widget'

class MainTablePage extends BasePage {
  readonly mainTable: MainTableWidget
  constructor() {
    super()
    this.mainTable = new MainTableWidget({
      selectors: {
        selectPreset: `[data-testid = "${MainTableDataCy.selectPreset}"]`,
        preset: `${MainTableDataCy.preset}`,
        addSample: `[data-testid = "${MainTableDataCy.addSample}"]`,
        applyButton: `[data-testid = "${MainTableDataCy.applyButton}"]`,
        cancelButton: `[data-testid = "${MainTableDataCy.cancelButton}"]`,
      },
    })
  }
}
export const mainTablePage = new MainTablePage()
