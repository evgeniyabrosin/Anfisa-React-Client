import { BaseAttributeStore } from '@pages/filter/common/attributes/base-attribute.store'
import modalsControlStore from '../modals/modals-control-store'

export const dtreeAttributeStore = new BaseAttributeStore({
  getAttributeStatus: () => modalsControlStore.attributeStatusToChange,
  getInitialCondition: () => modalsControlStore.currentGroupToChange,
})
