import { makeAutoObservable } from 'mobx'

import dtreeStore from '@store/dtree'
import { getIndexWithoutEmptySteps } from '@utils/getIndexWithoutEmptySteps'

class ModalEditStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = dtreeStore.groupIndexToChange
    const calculatedIndex = getIndexWithoutEmptySteps()

    const indexForApi = dtreeStore.getStepIndexForApi(calculatedIndex)
    const location: [number, number] = [indexForApi, locationIndex]
    return location
  }
}

export default new ModalEditStore()
