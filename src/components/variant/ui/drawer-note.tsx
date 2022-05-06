import { ChangeEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import variantStore from '@store/ws/variant'
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

  const handleChange = (note: string) => {
    const validationResult = validateNotes(note)

    validationResult.error ? setError(validationResult.error) : setError('')
    setValue(note)
  }

  return (
    <div
      ref={ref}
      className="w-96 bg-blue-light flex flex-col py-5 px-4 rounded-xl"
    >
      <span className="w-full">
        <span>{t('variant.notesFor')} </span>

        <span className="text-blue-bright">
          {`[${genInfo}] `}

          <span dangerouslySetInnerHTML={{ __html: hg19 }} />
        </span>
      </span>
      <div className="relative mt-3">
        {error && (
          <div className="absolute -top-2.5 text-12 text-red-secondary">
            {error}
          </div>
        )}

        <textarea
          placeholder="Enter text"
          className="w-full mt-2 p-3 h-80 rounded-lg resize-none mx-auto"
          rows={15}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(e.target.value)
          }
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
