import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { FilterRefiner } from '../../../src/components/data-testid/filter-refiner.cy'
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
        selectPreset: Helper.getDataId(FilterRefiner.selectPreset),
        saveDataset: Helper.getDataId(FilterRefiner.saveDataset),
      },
    })
    this.leftPanel = new FilterRefinerLeftPanelWidget({
      selectors: {
        searchField: Helper.getDataId(FilterRefiner.searchField),
        listElements: Helper.getDataId(FilterRefiner.listElements),
      },
    })
    this.filter = new FilterRefinerFilterWidget({
      selectors: {
        filterHeader: Helper.getDataId(FilterRefiner.filterHeader),
        filterElements: Helper.getDataId(FilterRefiner.filterElements),
        filterElementsCheckbox: Helper.getDataId(CommonSelectors.checkbox),
        addButton: Helper.getDataId(FilterRefiner.addButton),
        clearButton: Helper.getDataId(FilterRefiner.clearButton),
      },
      labels: {
        filterHeader: '',
        filterElements: '',
      },
    })
    this.total = new FilterRefinerTotalWidget({
      selectors: {
        applyButton: Helper.getDataId(FilterRefiner.applyButton),
        rulesListElement: Helper.getDataId(FilterRefiner.rulesListElement),
        rulesListCheckbox: Helper.getDataId(CommonSelectors.checkbox),
        variantsNumber: Helper.getDataId(FilterRefiner.variantsNumber),
      },
      labels: {
        rulesListElement: '',
        variantsNumber: '',
      },
    })
  }
}

export const filterRefinerPage = new FilterRefinerPage()
