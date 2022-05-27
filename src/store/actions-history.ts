import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, observable } from 'mobx'

export class ActionsHistoryStore<T> {
  history: T[] = []
  historyIndex: number = -1
  onChange: (state: T) => void

  constructor(onChange: (state: T) => void) {
    makeAutoObservable(this, { history: observable.shallow })
    this.onChange = onChange
  }

  public get isForwardAllowed(): boolean {
    return this.historyIndex < this.history.length - 1
  }

  public get isBackwardAllowed(): boolean {
    return this.history.length > 0 && this.historyIndex > 0
  }

  public goForward = () => {
    this.historyIndex++
    this.onChange(this.history[this.historyIndex])
  }

  public goBackward = () => {
    this.historyIndex--
    this.onChange(this.history[this.historyIndex])
  }

  public addHistory(history: T) {
    this.history.splice(
      this.historyIndex + 1,
      this.history.length,
      cloneDeep(history),
    )
    this.historyIndex++
  }

  resetHistory() {
    this.history = []
    this.historyIndex = -1
  }
}
