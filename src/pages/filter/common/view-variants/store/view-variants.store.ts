import { IReactionDisposer, makeAutoObservable, reaction, toJS } from 'mobx'

import { VariantAspectsAsyncStore } from '@store/variant-aspects.async.store'
import { IRecordDescriptor } from '@service-providers/common'
import { IReccntArguments } from '@service-providers/dataset-level'
import { DsListAsyncStore } from './ds-list.async.store'
import { TVariantsViewMode } from './view-variants.interface'

class ViewVariantsStore {
  public readonly dsList = new DsListAsyncStore()
  public readonly record = new VariantAspectsAsyncStore()

  public variantIndex = -1

  private _viewMode: TVariantsViewMode = 'samples'

  private readonly listReactionDisposer: IReactionDisposer
  private readonly recordReactionDisposer: IReactionDisposer

  constructor() {
    makeAutoObservable(this)

    this.listReactionDisposer = reaction(
      () => this.dsList.query,
      () => {
        this._viewMode = 'samples'
        this.variantIndex = 0
      },
    )

    this.recordReactionDisposer = reaction(
      () => this.recordQuery,
      query => {
        if (query) {
          this.record.setQuery(query)
        } else {
          this.record.reset()
        }
      },
    )
  }

  public get variants(): IRecordDescriptor[] {
    return toJS(this.dsList.data?.[this.viewMode]) ?? []
  }

  public get selectedVariant(): IRecordDescriptor | undefined {
    return this.variants[this.variantIndex]
  }

  public get hasSamples(): boolean {
    return !!this.dsList.data?.samples
  }

  public get hasRecords(): boolean {
    return !!this.dsList.data?.records
  }

  public get viewMode(): TVariantsViewMode {
    if (this.dsList.data && this._viewMode in this.dsList.data) {
      return this._viewMode
    }
    if (!this.dsList.data?.samples && this.dsList.data?.records) {
      return 'records'
    }

    return 'samples'
  }

  public setViewMode(type: TVariantsViewMode): void {
    if (this.dsList.data && type in this.dsList.data) {
      this._viewMode = type
      this.setVariantIndex(0)
    }
  }

  public setVariantIndex = (index: number): void => {
    this.variantIndex = index
  }

  public dispose(): void {
    this.listReactionDisposer()
    this.recordReactionDisposer()
  }

  private get recordQuery(): IReccntArguments | undefined {
    const ds = this.dsList.query?.ds
    const rec = this.selectedVariant?.no

    if (ds && rec !== undefined) {
      return {
        ds,
        rec,
      }
    }

    return undefined
  }
}

export const viewVariantsStore = new ViewVariantsStore()
