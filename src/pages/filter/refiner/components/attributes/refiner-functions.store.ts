import { BaseFunctionsStore } from '@pages/filter/common/attributes/base-functions.store'
import { refinerAttributeStore } from './refiner-attributes.store'

export const refinerFunctionsStore = new BaseFunctionsStore(
  refinerAttributeStore,
)
