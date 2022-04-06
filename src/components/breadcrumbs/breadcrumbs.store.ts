import { makeAutoObservable, toJS } from 'mobx'

import dirinfoStore from '@store/dirinfo'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'

export class BreadcrumbsStore {
  private datasetName: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  get ancestors(): { name: string; isXl: boolean }[] | undefined {
    return this.dataset?.ancestors
      ?.map(([name]) => ({
        name,
        isXl: dirinfoStore.dirinfo?.['ds-dict']?.[name].kind === 'xl',
      }))
      ?.reverse()
  }

  get secondaryOptions(): string[] | undefined {
    return this.dataset?.secondary || this.ancestorDataset?.secondary
  }

  get dataset(): IDirInfoDatasetDescriptor | undefined {
    return this.getDataset(this.datasetName)
  }

  get ancestorDataset(): IDirInfoDatasetDescriptor | undefined {
    const ancestorName = this.dataset?.ancestors?.[0]?.[0]
    if (ancestorName) {
      return this.getDataset(ancestorName)
    }

    return undefined
  }

  setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  private getDataset(name: string): IDirInfoDatasetDescriptor | undefined {
    return toJS(dirinfoStore.dirinfo?.['ds-dict']?.[name])
  }
}

export default new BreadcrumbsStore()
