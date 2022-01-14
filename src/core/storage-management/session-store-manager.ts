import { StoreManager } from './store-manager-base'

export class SessionStoreManager extends StoreManager {
  protected static storage: Storage = sessionStorage
}
