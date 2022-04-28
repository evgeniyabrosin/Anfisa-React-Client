import styles from './drawer-note.module.css'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
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

  const ref = useRef(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useOutsideClick(ref, () => close())

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

  const textAreaValue = textareaRef.current?.value

  // resize textarea height
  useEffect(() => {
    if (!textareaRef.current) return

    if (textAreaValue === '') {
      textareaRef.current.style.height = '55px'
      return
    }

    // if value = '' && focus===false max-width = 44px

    // Reset field height
    textareaRef.current.style.height = 'inherit'

    // Get the computed styles for the element
    const computed = window.getComputedStyle(textareaRef.current)

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      textareaRef.current.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10)

    textareaRef.current.style.height = `${height}px`
  }, [textAreaValue])

  const handleChange = (note: string) => {
    const validationResult = validateNotes(note)

    validationResult.error ? setError(validationResult.error) : setError('')
    setValue(note)
  }

  return (
    <div ref={ref} className={classNames(styles.modalWrapper, 'bg-blue-light')}>
      <div className={styles.modalTitle}>
        <span>{t('variant.notesFor')} </span>

        <span className="text-blue-bright">
          {`[${genInfo}] `}

          <span dangerouslySetInnerHTML={{ __html: hg19 }} />
        </span>
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
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event.target.value)
          }
          className={classNames(
            styles.modalTextArea,
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
