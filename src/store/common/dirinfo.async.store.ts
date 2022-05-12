import { BaseAsyncDataStore } from '@store/common'
import { IDirInfo } from '@service-providers/vault-level/vault-level.interface'
import vaultProvider from '@service-providers/vault-level/vault-level.provider'

export class DirInfoAsyncStore extends BaseAsyncDataStore<IDirInfo, null> {
  constructor() {
    super()
    this.setQuery(null)
  }

  protected fetch(): Promise<IDirInfo> {
    return vaultProvider.getDirInfo()
  }
}
