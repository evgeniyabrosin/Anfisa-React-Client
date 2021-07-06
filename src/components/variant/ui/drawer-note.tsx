import { useEffect, useState } from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import operationsStore from '@store/operations'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { PopperButton } from '@ui/popper-button'

const DrawerNoteButton = observer(({ refEl, onClick }: any) => {
  return (
    <Button
      refEl={refEl}
      text={variantStore.noteText ? undefined : '+ Add'}
      className={classNames('text-white', {
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

  useEffect(() => {
    setValue(variantStore.noteText)
  }, [])

  const handleSaveNoteAsync = async () => {
    await operationsStore.createNoteAsync(value)
    variantStore.setNoteText(value)
    close()
  }

  return (
    <div className="bg-blue-light flex flex-col py-5 px-4 rounded-xl">
      <span className="w-full">
        Note for{' '}
        <span className="text-blue-bright">{`[${genInfo}] ${hg19}`}</span>
      </span>
      <textarea
        placeholder="Enter text"
        className="w-96 mt-5 p-3 h-80 rounded-lg resize-none"
        rows={15}
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />

      <div className="flex ml-auto mt-4">
        <Button
          text={t('general.cancel')}
          onClick={close}
          hasBackground={false}
          className="text-black mr-3"
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
      <span className="text-14 text-white px-3">Notes</span>

      <PopperButton
        ButtonElement={DrawerNoteButton}
        ModalElement={DrawerNoteModal}
      />
    </div>
  )
})
