import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreFetchOptions,
  TBaseDataStoreOptions,
} from '@store/common'
import datasetStore from '@store/dataset/dataset'
import {
  datasetProvider,
  HgModes,
  IReccntArguments,
  ITableAspectDescriptor,
  TAspectDescriptor,
} from '@service-providers/dataset-level'
import { findElementInRow } from '@utils/mian-table/find-element-in-row'

const VARIANT_WITHOUT_GENES = 'None'

export class VariantAspectsAsyncStore extends BaseAsyncDataStore<
  TAspectDescriptor[],
  IReccntArguments
> {
  constructor(options: TBaseDataStoreOptions = {}) {
    super(options)

    makeObservable(this, {
      aspects: computed,
      generalAspect: computed,
      hg19locus: computed,
      hg38locus: computed,
      locus: computed,
      genes: computed,
      igvUrl: computed,
    })
  }

  public get aspects(): TAspectDescriptor[] {
    return toJS(this.data) ?? []
  }

  public get generalAspect(): ITableAspectDescriptor | undefined {
    return this.aspects.find(aspect => aspect.name === 'view_gen') as
      | ITableAspectDescriptor
      | undefined
  }

  public get hg19locus(): string {
    return findElementInRow(this.generalAspect?.rows ?? [], 'hg19')
  }

  public get hg38locus(): string {
    return findElementInRow(this.generalAspect?.rows ?? [], 'hg38')
  }

  public get locus(): string {
    const { locusMode } = datasetStore
    return locusMode === HgModes.HG19 ? this.hg19locus : this.hg38locus
  }

  public get genes(): string {
    const rows = this.generalAspect?.rows ?? []

    return findElementInRow(rows, 'genes') || VARIANT_WITHOUT_GENES
  }

  public get igvUrl(): string | undefined {
    const igvUrls = datasetStore.dsInfoData?.igvUrls

    if (!igvUrls) {
      return
    }

    let names: string[] = []

    const qualityAspect = this.aspects.find(
      aspect => aspect.name === 'view_qsamples',
    ) as ITableAspectDescriptor | undefined

    if (qualityAspect) {
      names = qualityAspect.rows[0]?.cells
        .map(cell => cell[0].split(': ')[1])
        .filter(Boolean)
    }

    if (!this.generalAspect) {
      return undefined
    }

    const locus = this.generalAspect.rows
      .find(row => row.name === 'hg38')
      ?.cells[0]?.[0]?.split(' ')[0]

    if (!locus) {
      return undefined
    }

    return new URLSearchParams({
      locus,
      names: names.join(','),
      igvUrls: JSON.stringify(igvUrls),
    }).toString()
  }

  protected fetch(
    query: IReccntArguments,
    options: TBaseDataStoreFetchOptions,
  ): Promise<TAspectDescriptor[]> {
    return datasetProvider.getRecCnt(query, {
      signal: options.abortSignal,
    })
  }
}
