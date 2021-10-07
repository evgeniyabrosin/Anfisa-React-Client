import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import operationsStore from '@store/operations'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { PopperButton } from '@components/popper-button'

const DrawerNoteButton = observer(({ refEl, onClick }: any) => {
  return (
    <Button
      refEl={refEl}
      text={variantStore.noteText ? undefined : '+ Add'}
      className={classNames('text-white hover:bg-blue-bright', {
        'bg-blue-bright': !!variantStore.noteText,
      })}
      size="xs"
      icon={variantStore.noteText ? <Icon name="File" /> : undefined}
      hasBackground={false}
      onClick={onClick}
    />
  )
})

const DrawerNoteModal = observer(({ close }: any) => {
  const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
  const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')
  const [value, setValue] = useState('')

  const ref = useRef(null)

  useOutsideClick(ref, () => close())

  useEffect(() => {
    setValue(variantStore.noteText)
  }, [])

  const handleSaveNoteAsync = async () => {
    await operationsStore.createNoteAsync(value)
    variantStore.setNoteText(value)
    close()
  }

  const deleteNoteAsync = async () => {
    await operationsStore.createNoteAsync('')
    variantStore.setNoteText('')
    setValue('')
    close()
  }

  return (
    <div ref={ref} className="bg-blue-light flex flex-col py-5 px-4 rounded-xl">
      <span className="w-full">
        <span>{t('variant.notesFor')} </span>

        <span className="text-blue-bright">
          {`[${genInfo}] `}

          <span dangerouslySetInnerHTML={{ __html: hg19 }} />
        </span>
      </span>

      <textarea
        placeholder="Enter text"
        className="w-96 mt-5 p-3 h-80 rounded-lg resize-none mx-auto"
        rows={15}
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />

      <div className="flex mt-4">
        {variantStore.noteText && (
          <Button
            text={t('general.delete')}
            onClick={deleteNoteAsync}
            hasBackground={false}
            className="text-black border-red-secondary mr-auto"
          />
        )}

        <Button
          text={t('general.cancel')}
          onClick={close}
          hasBackground={false}
          className="text-black mr-3 ml-auto"
        />
        <Button
          text="Save note"
          hasBackground={false}
          className="text-black"
          onClick={handleSaveNoteAsync}
        />
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
