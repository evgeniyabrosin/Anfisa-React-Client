import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, observable, reaction, toJS } from 'mobx'

import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import { TVariantAspectsGridLayout } from '@components/variant-aspects-layout'
import {
  IVariantDrawerData,
  IVariantDrawerGridPreset,
  VariantDrawerLayoutMode,
  VariantDrawerPredefinedPresets,
} from './variant-drawer.interface'

const predefinedPresets: IVariantDrawerGridPreset[] = [
  {
    name: 'List',
    predefinedName: VariantDrawerPredefinedPresets.List,
  },
]

const presetsSortComparator = (
  a: IVariantDrawerGridPreset,
  b: IVariantDrawerGridPreset,
): number => {
  if (a.predefinedName !== b.predefinedName) {
    return a.predefinedName ? -1 : 1
  }

  return a.name.localeCompare(b.name)
}

class VariantDrawerStore {
  public layoutMode: VariantDrawerLayoutMode
  public galleryActiveAspect = ''

  private readonly customGridPresets: IVariantDrawerGridPreset[]
  private currentGridLayout: TVariantAspectsGridLayout | undefined
  private appliedPreset: string | null = null

  constructor() {
    makeAutoObservable<VariantDrawerStore, 'customGridPresets'>(this, {
      customGridPresets: observable.shallow,
    })

    const { mode, presets, preset } = VariantDrawerStore.restoreData()

    this.layoutMode = mode
    this.customGridPresets = presets
    this.appliedPreset = preset

    if (this.appliedPreset) {
      this.applyGridPreset(this.appliedPreset)
    }

    reaction(() => this.layoutData, VariantDrawerStore.saveData)
  }

  public get gridLayout(): TVariantAspectsGridLayout {
    return toJS(this.currentGridLayout ?? [])
  }

  public get gridWindowsOpenState(): boolean {
    return this.currentGridLayout?.some(item => item.h > 1) ?? false
  }

  public get gridPresets(): IVariantDrawerGridPreset[] {
    return [...predefinedPresets, ...toJS(this.customGridPresets)].sort(
      presetsSortComparator,
    )
  }

  public readonly setLayoutMode = (type: VariantDrawerLayoutMode): void => {
    this.layoutMode = type
  }

  public readonly setGridLayout = (layout: TVariantAspectsGridLayout): void => {
    this.currentGridLayout = layout
  }

  public readonly applyGridPreset = (presetName: string) => {
    const preset = this.gridPresets.find(item => item.name === presetName)

    if (preset) {
      this.appliedPreset = presetName

      if (preset.predefinedName) {
        switch (preset.predefinedName) {
          case VariantDrawerPredefinedPresets.List:
            this.currentGridLayout = []
            break
        }
      } else if (preset.layout) {
        this.currentGridLayout = cloneDeep(preset.layout)
      }
    }
  }

  public readonly saveGridPreset = (presetName: string) => {
    const presetIndex = this.customGridPresets.findIndex(
      ({ name }) => name === presetName,
    )
    const preset = {
      name: presetName,
      layout: this.currentGridLayout,
    }

    if (presetIndex < 0) {
      this.customGridPresets.push(preset)
    } else {
      this.customGridPresets[presetIndex] = preset
    }

    this.appliedPreset = presetName
  }

  public readonly setGalleryActiveAspect = (aspect: string): void => {
    this.galleryActiveAspect = aspect
  }

  private get layoutData(): IVariantDrawerData {
    return toJS({
      mode: this.layoutMode,
      presets: toJS(this.customGridPresets),
      preset: this.appliedPreset,
    })
  }

  private static restoreData(): IVariantDrawerData {
    const data: Partial<IVariantDrawerData> | undefined =
      LocalStoreManager.read('variantDrawer')
    return {
      mode: data?.mode ?? VariantDrawerLayoutMode.Grid,
      presets: data?.presets ?? [],
      preset: data?.preset ?? null,
    }
  }

  private static saveData(data: IVariantDrawerData) {
    LocalStoreManager.write('variantDrawer', data)
  }
}

export const variantDrawerStore = new VariantDrawerStore()
