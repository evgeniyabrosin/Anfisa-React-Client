import { ReactElement, useState } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'

interface IPresetCreateDialogProps {
  isOpen?: boolean
  onClose: () => void
  onCreate: (presetName: string) => void
}

export const PresetCreateDialog = ({
  isOpen,
  onClose,
  onCreate,
}: IPresetCreateDialogProps): ReactElement => {
  const [presetName, setPresetName] = useState('')

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('presetControl.createDialog.title')}
      applyText={t('general.create')}
      isApplyDisabled={!presetName}
      onApply={() => onCreate(presetName)}
    >
      <Input
        value={presetName}
        label={t('presetControl.createDialog.presetName')}
        placeholder={t('presetControl.createDialog.presetNamePlaceholder')}
        onChange={event => setPresetName(event.target.value)}
      />
    </Dialog>
  )
}
