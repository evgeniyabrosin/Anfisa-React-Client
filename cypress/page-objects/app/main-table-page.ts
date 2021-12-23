import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { MainTableDataCy } from '../../../src/components/data-testid/main-table.cy'
import { BasePage } from '../lib/base-page'
import { Button } from '../lib/button'
import { Helper } from '../lib/helpers'
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
  exportCsv: string
  customizeTable: string
  columnSwitch: string
  searchColumn: string
  columnHeader: string
  checkboxListElement: string
  customizeTableList: string
}
export interface MainTableLables {
  numVariants: string
  columnHeader?: string
  checkboxListElement?: string
  customizeTableList: string
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
  readonly exportCsv: Button
  readonly customizeTable: Button
  readonly columnSwitch: Button
  readonly searchColumn: Input
  readonly columnHeader: Label
  readonly checkboxListElement: Label
  readonly customizeTableList: Label

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
    this.customizeTableList = new Label(
      selectors.customizeTableList,
      labels.customizeTableList,
    )
    this.exportCsv = new Button(selectors.exportCsv)
  }
}
class MainTablePage extends BasePage {
  readonly mainTable: MainTableWidget
  constructor(labelContent?: string) {
    super()
    this.mainTable = new MainTableWidget({
      selectors: {
        selectPreset: Helper.getDataId(MainTableDataCy.selectPreset),
        preset: `${CommonSelectors.preset}`,
        addSample: Helper.getDataId(MainTableDataCy.addSample),
        addTag: Helper.getDataId(MainTableDataCy.addTag),
        applyButton: Helper.getDataId(MainTableDataCy.applyButton),
        cancelButton: Helper.getDataId(MainTableDataCy.cancelButton),
        checkbox: `${CommonSelectors.checkbox}`,
        tableRow: `${CommonSelectors.tableRow}`,
        addGene: Helper.getDataId(MainTableDataCy.addGene),
        geneCheckbox: `${CommonSelectors.checkbox}`,
        searchFilter: Helper.getDataId(MainTableDataCy.searchFilter),
        numVariants: Helper.getDataId(MainTableDataCy.numVariants),
        exportReport: Helper.getDataId(MainTableDataCy.exportReport),
        exportExcel: Helper.getDataId(MainTableDataCy.exportExcel),
        exportCsv: Helper.getDataId(MainTableDataCy.exportCsv),
        customizeTable: Helper.getDataId(MainTableDataCy.customizeTable),
        columnSwitch: `${CommonSelectors.columnSwitch}`,
        searchColumn: Helper.getDataId(MainTableDataCy.searchColumn),
        columnHeader: `${CommonSelectors.columnHeader}`,
        checkboxListElement: Helper.getDataId(
          MainTableDataCy.checkboxListElement,
        ),
        customizeTableList: Helper.getDataId(
          MainTableDataCy.customizeTableList,
        ),
      },
      labels: {
        numVariants: 'number-of-variants',
        columnHeader: labelContent,
        checkboxListElement: labelContent,
        customizeTableList: 'In-Silico',
      },
    })
  }
}
export const mainTablePage = new MainTablePage()
