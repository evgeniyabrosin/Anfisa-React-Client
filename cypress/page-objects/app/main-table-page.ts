import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { MainTableDataCy } from '../../../src/components/data-testid/main-table.cy'
import { BasePage } from '../lib/base-page'
import { Button } from '../lib/button'
import { Input } from '../lib/input'
import { Label } from '../lib/label'
import { MainTableCheckbox } from '../lib/main-table-checkbox'
import { UIWidget } from '../lib/ui-widget'

export interface MainTableSelectors {
  selectPreset: string
  preset: string
  addSample: string
  applyButton: string
  cancelButton: string
  checkbox: string
  tableRow: string
  addTag: string
  addGene: string
  geneCheckbox: string
  searchFilter: string
  numVariants: string
  exportReport: string
  exportExcel: string
  customizeTable: string
  columnSwitch: string
  searchColumn: string
  columnHeader: string
  checkboxListElement: string
}
export interface MainTableLables {
  numVariants: string
  columnHeader?: string
  checkboxListElement?: string
}

export class MainTableWidget extends UIWidget {
  readonly selectPreset: Button
  readonly preset: Button
  readonly addSample: Button
  readonly applyButton: Button
  readonly cancelButton: Button
  readonly checkbox: MainTableCheckbox
  readonly tableRow: Button
  readonly addTag: Button
  readonly addGene: Button
  readonly geneCheckbox: MainTableCheckbox
  readonly searchFilter: Input
  readonly numVariants: Label
  readonly exportReport: Button
  readonly exportExcel: Button
  readonly customizeTable: Button
  readonly columnSwitch: Button
  readonly searchColumn: Input
  readonly columnHeader: Label
  readonly checkboxListElement: Label

  constructor(options: {
    selectors: MainTableSelectors
    labels: MainTableLables
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.selectPreset = new Button(selectors.selectPreset)
    this.preset = new Button(selectors.preset)
    this.addSample = new Button(selectors.addSample)
    this.applyButton = new Button(selectors.applyButton)
    this.cancelButton = new Button(selectors.cancelButton)
    this.checkbox = new MainTableCheckbox(selectors.checkbox)
    this.tableRow = new Button(selectors.tableRow)
    this.addTag = new Button(selectors.addTag)
    this.addGene = new Button(selectors.addGene)
    this.geneCheckbox = new MainTableCheckbox(selectors.geneCheckbox)
    this.searchFilter = new Input(selectors.searchFilter)
    this.numVariants = new Label(selectors.numVariants, labels.numVariants)
    this.exportReport = new Button(selectors.exportReport)
    this.exportExcel = new Button(selectors.exportExcel)
    this.customizeTable = new Button(selectors.customizeTable)
    this.columnSwitch = new Button(selectors.columnSwitch)
    this.searchColumn = new Input(selectors.searchColumn)
    this.columnHeader = new Label(selectors.columnHeader, labels.columnHeader!)
    this.checkboxListElement = new Label(
      selectors.checkboxListElement,
      labels.checkboxListElement!,
    )
  }
}
class MainTablePage extends BasePage {
  readonly mainTable: MainTableWidget
  constructor(labelContent?: string) {
    super()
    this.mainTable = new MainTableWidget({
      selectors: {
        selectPreset: `[data-testid = "${MainTableDataCy.selectPreset}"]`,
        preset: `${CommonSelectors.preset}`,
        addSample: `[data-testid = "${MainTableDataCy.addSample}"]`,
        addTag: `[data-testid = "${MainTableDataCy.addTag}"]`,
        applyButton: `[data-testid = "${MainTableDataCy.applyButton}"]`,
        cancelButton: `[data-testid = "${MainTableDataCy.cancelButton}"]`,
        checkbox: `${CommonSelectors.checkbox}`,
        tableRow: `${CommonSelectors.tableRow}`,
        addGene: `[data-testid = "${MainTableDataCy.addGene}"]`,
        geneCheckbox: `${CommonSelectors.checkbox}`,
        searchFilter: `[data-testid = "${MainTableDataCy.searchFilter}"]`,
        numVariants: `[data-testid = "${MainTableDataCy.numVariants}"]`,
        exportReport: `[data-testid = "${MainTableDataCy.exportReport}"]`,
        exportExcel: `[data-testid = "${MainTableDataCy.exportExcel}"]`,
        customizeTable: `[data-testid = "${MainTableDataCy.customizeTable}"]`,
        columnSwitch: `${CommonSelectors.columnSwitch}`,
        searchColumn: `[data-testid = "${MainTableDataCy.searchColumn}"]`,
        columnHeader: `${CommonSelectors.columnHeader}`,
        checkboxListElement: `[data-testid = "${MainTableDataCy.checkboxListElement}"]`,
      },
      labels: {
        numVariants: 'number-of-variants',
        columnHeader: labelContent,
        checkboxListElement: labelContent,
      },
    })
  }
}
export const mainTablePage = new MainTablePage()
