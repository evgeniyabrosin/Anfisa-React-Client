import { makeAutoObservable } from 'mobx'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'

class FilterControlRefinerStore {
  private _presetNameForAction = ''
  private _actionName: ActionFilterEnum | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  public get presetNameForAction(): string {
    return this._presetNameForAction
  }

  public setPresetNameForAction(presetName: string) {
    this._presetNameForAction = presetName
  }

  public get actionName(): ActionFilterEnum | undefined {
    return this._actionName
  }

  public setActionName(actionName: ActionFilterEnum) {
    if (this._actionName === actionName) {
      return
    }
    if (actionName === ActionFilterEnum.Delete) {
      this._presetNameForAction = filterPresetsStore.activePresetInfo?.standard
        ? ''
        : filterPresetsStore.activePreset
    } else if (actionName === ActionFilterEnum.Create || !this._actionName) {
      this._presetNameForAction = ''
    }

    this._actionName = actionName
  }

  public resetActionName() {
    this._actionName = undefined
  }

  public resetAction() {
    this.resetActionName()
    this._presetNameForAction = ''
  }

  public get activePreset(): string {
    return filterPresetsStore.activePreset
  }

  public get presets(): string[] {
    const { availablePresets } = filterPresetsStore
    const presets =
      this.actionName === ActionFilterEnum.Delete ||
      this.actionName === ActionFilterEnum.Modify
        ? availablePresets?.filter(preset => !preset.standard)
        : availablePresets

    return presets.map(preset => preset.name)
  }

  public applyAction(): void {
    const { conditions } = filterStore
    const { presetNameForAction, actionName } = this

    if (!actionName || !presetNameForAction) {
      return
    }

    // TODO: handle the pending state of the process

    switch (actionName) {
      case ActionFilterEnum.Create:
        filterPresetsStore.createPreset(presetNameForAction, conditions)
        break
      case ActionFilterEnum.Modify:
        filterPresetsStore.modifyPreset(presetNameForAction, conditions)
        break
      case ActionFilterEnum.Join:
        filterStore.joinPresetConditions(presetNameForAction)
        break
      case ActionFilterEnum.Delete:
        filterPresetsStore.deletePreset(presetNameForAction)
        break
    }
    this.resetAction()
  }
}

export default new FilterControlRefinerStore()
