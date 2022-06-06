import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import { showToast } from '@utils/notifications/showToast'
import { noFirstSymbolsPattern } from '@utils/validation/validationPatterns'

class DrawerTagsStore {
  localCheckedTags: string[] = []
  customTag: string = ''
  errorMessage: string = ''

  get tags(): string[] {
    return [...variantStore.generalTags, ...variantStore.optionalTags]
  }

  constructor() {
    makeAutoObservable(this)
  }

  setLocalCheckedTagList(tagNameList: string[]): void {
    this.localCheckedTags = [...tagNameList]
  }

  addLocalCheckedTag(tagName: string): void {
    this.localCheckedTags = [...this.localCheckedTags, tagName]
  }

  removeLocalCheckedTag(tagName: string): void {
    const filteredList = this.localCheckedTags.filter(
      prevTagName => prevTagName !== tagName,
    )

    this.localCheckedTags = filteredList
  }

  handleCheckTag(isChecked: boolean, tagName: string): void {
    isChecked
      ? this.addLocalCheckedTag(tagName)
      : this.removeLocalCheckedTag(tagName)
  }

  setCustomTag(message: string): void {
    this.customTag = message
  }

  resetCustomTag(): void {
    this.customTag = ''
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message
  }

  resetErrorMessage(): void {
    this.errorMessage = ''
  }

  handleChangeCustomTag(tagName: string) {
    if (
      this.tags
        .map(tag => tag.toLocaleLowerCase())
        .includes(tagName.toLocaleLowerCase())
    ) {
      this.setErrorMessage(t('variant.tagExists'))
    } else {
      this.resetErrorMessage()
    }

    if (tagName.length > 30) this.setErrorMessage(t('error.tagNameIsTooLong'))

    if (noFirstSymbolsPattern.test(tagName)) {
      this.setErrorMessage(t('error.noFirstSymbols'))
    }

    this.setCustomTag(tagName)
  }

  handleSetCustomTag() {
    if (variantStore.generalTags.includes(this.customTag)) {
      showToast(t('variant.tagExists'), 'error')
    } else {
      variantStore.updateGeneralTags(this.customTag)
      variantStore.updateTagsWithNotes([this.customTag, true])
      this.resetCustomTag()
    }
  }

  async handleSaveTagsAsync(): Promise<void> {
    const tagList: TTagsDescriptor = {}

    this.localCheckedTags.forEach(tagName => {
      tagList[tagName] = true
    })

    variantStore.fetchSelectedTagsAsync(tagList)
  }
}

export default new DrawerTagsStore()
