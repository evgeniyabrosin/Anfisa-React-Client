import styles from './drawer-note.module.css'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { useResizeTextAreaHeight } from '@core/hooks/use-resize-text-area-height'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { VariantDrawerDataCy } from '@components/data-testid/variant-drawer.cy'
import { PopperButton } from '@components/popper-button'
import { getParsedValue } from '@utils/drawer/getParsedValue'
import { validateNotes } from '@utils/validation/validateNotes'

const DrawerNoteButton = observer(({ refEl, onClick }: any) => {
  return (
    <Button
      refEl={refEl}
      text={variantStore.noteText ? undefined : '+ Add'}
      className={classNames({
        'bg-blue-bright': !!variantStore.noteText,
      })}
      size="xs"
      icon={variantStore.noteText ? <Icon name="File" /> : undefined}
      variant="secondary-dark"
      onClick={onClick}
      dataTestId={VariantDrawerDataCy.addNote}
    />
  )
})

const DrawerNoteModal = observer(({ close }: any) => {
  const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
  const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const wrapperRef = useRef(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useOutsideClick(wrapperRef, () => close())

  useResizeTextAreaHeight(textareaRef.current)

  useEffect(() => {
    setValue(variantStore.noteText)
  }, [])

  const handleSaveNoteAsync = async () => {
    const noteValue: string = value.includes('"')
      ? getParsedValue(value)
      : value

    variantStore.updateTagsWithNotes(['_note', noteValue])

    variantStore.setNoteText(value)

    variantStore.fetchSelectedTagsAsync(variantStore.tagsWithNotes)
    close()
  }

  const deleteNoteAsync = async () => {
    variantStore.updateTagsWithNotes(['_note', true], 'remove')
    variantStore.setNoteText('')
    setValue('')
    variantStore.fetchSelectedTagsAsync(variantStore.tagsWithNotes)
    close()
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    const validationResult = validateNotes(value)

    validationResult.error ? setError(validationResult.error) : setError('')
    setValue(value)
  }

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles['modal-wrapper'], 'bg-blue-light')}
    >
      <div className={styles['modal-title']}>
        <div>
          <span>{t('variant.notesFor')} </span>

          <span className="text-blue-bright">
            {`[${genInfo}] `}

            <span dangerouslySetInnerHTML={{ __html: hg19 }} />
          </span>
        </div>

        <Icon
          name="Close"
          onClick={close}
          size={16}
          className="cursor-pointer"
        />
      </div>

      <div>
        {error && (
          <div className="absolute -top-2.5 text-12 text-red-secondary">
            {error}
          </div>
        )}

        <textarea
          ref={textareaRef}
          placeholder={t('variant.textAboutSomething')}
          value={value}
          onChange={handleChange}
          className={classNames(
            styles['modal-text-area'],
            'focus:border-l-2 focus:border-blue-bright',
          )}
        />
      </div>

      <div className="flex justify-between mt-4">
        <div>
          {variantStore.noteText && (
            <Button
              text={t('general.delete')}
              onClick={deleteNoteAsync}
              variant="diestruction"
            />
          )}
        </div>

        <div className="flex items-center">
          <Button
            text={t('general.cancel')}
            onClick={close}
            variant="secondary"
          />

          <Button
            text="Save note"
            dataTestId={VariantDrawerDataCy.saveNote}
            disabled={!value || !value.trim() || !!error}
            className="ml-2"
            onClick={handleSaveNoteAsync}
          />
        </div>
      </div>
    </div>
  )
})

export const DrawerNote = observer(() => {
  return (
    <div className="flex border-l-2 border-blue-lighter ml-3 items-center">
      <span className="text-14 text-white px-3">{t('variant.notes')}</span>

      <PopperButton
        ButtonElement={DrawerNoteButton}
        ModalElement={DrawerNoteModal}
      />
    </div>
  )
})
