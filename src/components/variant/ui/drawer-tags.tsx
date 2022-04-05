import { useEffect, useRef } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { VariantDrawerDataCy } from '@components/data-testid/variant-drawer.cy'
import { PopperButton } from '@components/popper-button'
import drawerTagsStore from '../drawer-tags.store'
import { TagsContainer } from './tags-container'

const DrawerTagButton = observer(({ refEl, onClick }: any) => {
  return (
    <Button
      refEl={refEl}
      text="+ Add"
      size="xs"
      variant="secondary-dark"
      onClick={onClick}
      dataTestId={VariantDrawerDataCy.addTag}
    />
  )
})

const DrawerTagModal = observer(({ close }: any) => {
  const ref = useRef(null)

  useOutsideClick(ref, () => {
    !variantStore.isModalNotesVisible && close()
  })

  const { genes, hg19locus, tags, localCheckedTags, customTag, errorMessage } =
    drawerTagsStore

  useEffect(() => {
    drawerTagsStore.setLocalCheckedTagList(toJS(variantStore.checkedTags))
  }, [])

  // TODO: The need of this feature is in doubt
  // const handleClick = (tag: string) => {
  //   variantStore.showModalNotes()
  //   // variantStore.setCurrentTag(tag)
  // }

  const handleSaveTags = () => {
    drawerTagsStore.handleSaveTagsAsync()
    close()
  }

  return (
    <div
      ref={ref}
      className="bg-blue-light flex flex-col py-5 px-4 rounded-xl overflow-y-auto"
    >
      <span className="w-full">
        <span>{t('variant.tagsFor')} </span>

        <span className="text-blue-bright">
          {`[${genes}] `}

          <span dangerouslySetInnerHTML={{ __html: hg19locus }} />
        </span>
      </span>

      <div className="mt-4 h-auto overflow-auto" style={{ maxHeight: 300 }}>
        {tags.map(tagName => {
          const checked = localCheckedTags.includes(tagName)

          return (
            <div key={tagName} className="flex items-center mb-4">
              <Checkbox
                checked={checked}
                className="w-4 h-4"
                onChange={e =>
                  drawerTagsStore.handleCheckTag(e.target.checked, tagName)
                }
              />

              <span className="text-12 ml-1">{tagName}</span>

              {/* TODO: The need of this feature is in doubt  */}

              {/* <span
              className="ml-2 cursor-pointer hover:text-blue-bright"
              onClick={() => handleClick(tagName)}
            >
              {Object.keys(variantStore.tagsWithNotes).includes(tagName) && '(#)'}
            </span> */}
            </div>
          )
        })}
      </div>

      <div className="mt-2 h-auto">
        <Input
          value={customTag}
          onChange={(e: any) =>
            drawerTagsStore.handleChangeCustomTag(e.target.value)
          }
        />

        <div className="flex justify-between">
          {errorMessage && (
            <div className="mt-px text-12 text-red-secondary whitespace-nowrap">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end w-full">
            <Button
              text="Add custom tag"
              disabled={!customTag.trim() || !!errorMessage}
              className="mt-2"
              onClick={() => drawerTagsStore.handleSetCustomTag()}
              dataTestId={VariantDrawerDataCy.addCustomTag}
            />
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <Button
          text={t('general.cancel')}
          onClick={close}
          variant="secondary"
          className="mr-2 ml-auto"
        />

        <Button
          text="Save tags"
          onClick={handleSaveTags}
          dataTestId={VariantDrawerDataCy.saveTags}
        />
      </div>
    </div>
  )
})

export const DrawerTags = observer(() => {
  return (
    <div className="flex border-l-2 border-blue-lighter ml-3 items-center">
      <span className="text-14 text-white px-3">{t('variant.tags')}</span>

      <div className="mr-3">
        <PopperButton
          ButtonElement={DrawerTagButton}
          ModalElement={DrawerTagModal}
        />
      </div>

      {variantStore.checkedTags.length > 0 && <TagsContainer />}
    </div>
  )
})
