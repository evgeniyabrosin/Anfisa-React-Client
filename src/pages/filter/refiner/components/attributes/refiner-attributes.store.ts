import filterStore from '@store/filter'
import { BaseAttributeStore } from '@pages/filter/common/attributes/base-attribute.store'

export const refinerAttributeStore = new BaseAttributeStore({
  getAttributeStatus: () => filterStore.selectedAttributeStatus,
  getInitialCondition: () => filterStore.selectedCondition,
})
