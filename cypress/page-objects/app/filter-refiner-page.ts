import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { FilterRefinerDataCy } from '../../../src/components/data-testid/filter-refiner.cy'
import { BasePage } from '../lib/base-page'
import { Helper } from '../lib/helpers'
import { FilterRefinerMenuWidget } from './widgets/filter-refiner.widget'
import { FilterRefinerLeftPanelWidget } from './widgets/filter-refiner-left-panel.widget'
import { FilterRefinerFilterWidget } from './widgets/filter-refiner-select-filter.widget'
import { FilterRefinerTotalWidget } from './widgets/filter-refiner-total.widget'

class FilterRefinerPage extends BasePage {
  readonly menu: FilterRefinerMenuWidget
  readonly leftPanel: FilterRefinerLeftPanelWidget
  readonly filter: FilterRefinerFilterWidget
  readonly total: FilterRefinerTotalWidget

  constructor() {
    super()
    this.menu = new FilterRefinerMenuWidget({
      selectors: {
        selectPreset: Helper.getDataId(FilterRefinerDataCy.selectPreset),
        saveDataset: Helper.getDataId(FilterRefinerDataCy.saveDataset),
        undoButton: Helper.getDataId(FilterRefinerDataCy.undoButton),
        redoButton: Helper.getDataId(FilterRefinerDataCy.redoButton),
      },
    })
    this.leftPanel = new FilterRefinerLeftPanelWidget({
      selectors: {
        searchField: Helper.getDataId(FilterRefinerDataCy.searchField),
        listElements: Helper.getDataId(FilterRefinerDataCy.listElements),
      },
    })
    this.filter = new FilterRefinerFilterWidget({
      selectors: {
        filterHeader: Helper.getDataId(FilterRefinerDataCy.filterHeader),
        filterElements: FilterRefinerDataCy.filterElements,
        filterElementsCheckbox: CommonSelectors.checkbox,
        addButton: Helper.getDataId(FilterRefinerDataCy.addButton),
        clearButton: Helper.getDataId(FilterRefinerDataCy.clearButton),
        noProblemGroupSelected: Helper.getDataId(
          FilterRefinerDataCy.noProblemGroupSelected,
        ),
        problemGroup: Helper.getDataId(FilterRefinerDataCy.problemGroup),
        geneName: Helper.getDataId(FilterRefinerDataCy.geneName),
        selectReset: Helper.getDataId(FilterRefinerDataCy.selectReset),
        redMessage: CommonSelectors.redMessage,
        removeButton: Helper.getDataId(FilterRefinerDataCy.removeButton),
        inputNumberSamples: CommonSelectors.numberInput,
        inputText: CommonSelectors.tagInput,
        approxDropdown: Helper.getDataId(FilterRefinerDataCy.approxDropdown),
      },
      labels: {
        filterHeader: '',
        filterElements: '',
        noProblemGroupSelected: 'Out of choice. Select problem group.',
        problemGroup: '',
        geneName: '',
        redMessage: 'Improper approx mode gene',
      },
    })
    this.total = new FilterRefinerTotalWidget({
      selectors: {
        applyButton: Helper.getDataId(FilterRefinerDataCy.applyButton),
        resultsListElement: Helper.getDataId(
          FilterRefinerDataCy.resultsListElement,
        ),
        resultsListCheckbox: Helper.getDataId(CommonSelectors.checkbox),
        variantsNumber: Helper.getDataId(FilterRefinerDataCy.variantsNumber),
      },
      labels: {
        rulesListElement: '',
        variantsNumber: '',
      },
    })
  }
}

export const filterRefinerPage = new FilterRefinerPage()
