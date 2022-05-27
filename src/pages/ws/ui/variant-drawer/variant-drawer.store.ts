import { makeAutoObservable, reaction } from 'mobx'

import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import {
  TVariantAspectsGridLayout,
  VariantAspectsLayoutType,
} from '@components/variant-aspects-layout'
import { IVariantDrawerData } from './variant-drawer.interface'

class VariantLayoutStore {
  public type: VariantAspectsLayoutType

  private currentGridLayout: TVariantAspectsGridLayout | undefined

  constructor() {
    makeAutoObservable(this)

    const { type } = VariantLayoutStore.restoreLayout()

    this.type = type

    reaction(() => this.layoutData, VariantLayoutStore.saveLayout)
  }

  public get gridLayout(): TVariantAspectsGridLayout {
    return this.currentGridLayout ?? []
  }

  public get galleryActiveAspect(): string {
    return ''
  }

  public setLayoutType(type: VariantAspectsLayoutType): void {
    this.type = type
  }

  public readonly setGridLayout = (layout: TVariantAspectsGridLayout): void => {
    this.currentGridLayout = layout
  }

  public readonly setGalleryActiveAspect = (aspect: string): void => {}

  private get layoutData(): IVariantDrawerData {
    return {
      type: this.type,
    }
  }

  private static restoreLayout(): IVariantDrawerData {
    const layout: Partial<IVariantDrawerData> | undefined =
      LocalStoreManager.read('variantDrawer')
    return {
      type: layout?.type ?? VariantAspectsLayoutType.Grid,
    }
  }

  private static saveLayout(layout: IVariantDrawerData) {
    LocalStoreManager.write('variantDrawer', layout)
  }
}

export const variantLayoutStore = new VariantLayoutStore()
