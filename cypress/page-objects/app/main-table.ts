import { MainTableDataCy } from '../../../src/components/data-testid/main-table.cy'
import { BasePage } from '../lib/base-page'
import { MainTableWidget } from './widgets/main-table.widget'

class MainTablePage extends BasePage {
  readonly mainTable: MainTableWidget
  constructor() {
    super()
    this.mainTable = new MainTableWidget({
      selectors: {
        sampleButton: `[data-testid = "${MainTableDataCy.sampleButton}"]`,
        tableSection: `[#parent]`,
        mainTableHeader: `[data-testid = "${MainTableDataCy.mainTableHeader}"]`,
      },
      labels: {
        mainTableHeader: 'MainTableHeader',
      },
    })
  }
}
export const mainTablePage = new MainTablePage()
