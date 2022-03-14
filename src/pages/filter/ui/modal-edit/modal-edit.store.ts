import { makeAutoObservable } from 'mobx'

import activeStepStore from '@pages/filter/active-step.store'
import dtreeModalStore from '../../modals.store'
class ModalEditStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get location(): [number, number] {
    const locationIndex = dtreeModalStore.groupIndexToChange
    const { stepIndexForApi } = activeStepStore

    const location: [number, number] = [+stepIndexForApi, locationIndex]
    return location
  }
}

export default new ModalEditStore()
