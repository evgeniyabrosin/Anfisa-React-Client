import { makeAutoObservable } from 'mobx'

import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'

class ModalEditStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = dtreeStore.groupIndexToChange
    const { stepIndexForApi } = activeStepStore

    const location: [number, number] = [+stepIndexForApi, locationIndex]
    return location
  }
}

export default new ModalEditStore()
