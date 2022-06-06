import { BaseFunctionsStore } from '@pages/filter/common/attributes/base-functions.store'
import { dtreeAttributeStore } from './dtree-attributes.store'

export const dtreeFunctionsStore = new BaseFunctionsStore(dtreeAttributeStore)
