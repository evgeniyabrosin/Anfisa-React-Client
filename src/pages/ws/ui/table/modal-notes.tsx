import { ChangeEvent, useRef, useState } from 'react'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { Button } from '@ui/button'
import { HeaderModal } from '@pages/filter/dtree/components/modals/components/ui/header-modal'
import { ModalBase } from '@pages/filter/dtree/components/modals/components/ui/modal-base'
import { validateNotes } from '@utils/validation/validateNotes'

export const ModalNotes = observer(() => {
  const ref = useRef<any>(null)

  const handleClose = () => {
    variantStore.hideModalNotes()
  }

  const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
  const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')
  const tagsWithNotes = variantStore.tagsWithNotes

  const currentTag = variantStore.currentTag

  const currentText = get(toJS(tagsWithNotes), currentTag)

  const [value, setValue] = useState(currentText || '')
  const [error, setError] = useState('')

  const handleSaveNote = () => {
    variantStore.updateTagsWithNotes([currentTag, value])
    handleClose()
  }

  const handleChange = (note: string) => {
    const validationResult = validateNotes(note)

    validationResult.error ? setError(validationResult.error) : setError('')

    setValue(note)
  }

  return (
    <ModalBase refer={ref} minHeight={200} width="500px">
      <HeaderModal
        groupName={`${t('variant.notesFor')} [${genInfo}] ${hg19}`}
        handleClose={handleClose}
      />

      <div ref={ref} className="flex flex-col mt-2">
        <div>{currentTag}</div>

        <div className="relative mt-5">
          {error && (
            <div className="absolute -top-3.5 text-12 text-red-secondary">
              {error}
            </div>
          )}

          <textarea
            placeholder="Enter text"
            className="w-full mt-1 p-3 h-80 rounded-lg resize-none mx-auto shadow-dark"
            rows={15}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e.target.value)
            }
          />
        </div>

        <div className="w-full flex justify-end ml-auto mt-6">
          <div className="flex items-center">
            <Button
              text={t('general.cancel')}
              variant="secondary"
              onClick={handleClose}
            />

            <Button
              text={t('variant.saveNote')}
              disabled={!value || !!error}
              className="ml-2"
              onClick={handleSaveNote}
            />
          </div>
        </div>
      </div>
    </ModalBase>
  )
})
