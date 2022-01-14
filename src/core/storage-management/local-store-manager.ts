import { StoreManager } from './store-manager-base'

export class LocalStoreManager extends StoreManager {
  protected static storage: Storage = localStorage
}
