import { ReactElement, useEffect, useMemo, useState } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'
import { IVariantDrawerGridPreset } from '../../../variant-drawer.interface'

export interface ISavePresetDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (presetName: string) => void
  presets: IVariantDrawerGridPreset[]
}

export const SavePresetDialog = ({
  isOpen,
  onClose,
  onSave,
  presets,
}: ISavePresetDialogProps): ReactElement => {
  const [presetName, setPresetName] = useState('')

  const error = useMemo(() => {
    if (
      presets.some(
        preset => preset.predefinedName && preset.name === presetName,
      )
    ) {
      return t('variant.savePredefinedPresetError', { presetName })
    }

    return null
  }, [presets, presetName])

  useEffect(() => {
    if (isOpen) {
      setPresetName('')
    }
  }, [isOpen])

  return (
    <Dialog
      width="xs"
      isOpen={isOpen}
      onClose={onClose}
      title={t('variant.savePreset')}
      applyText={t('general.save')}
      onApply={() => onSave(presetName)}
      isApplyDisabled={!presetName || !!error}
    >
      <Input
        value={presetName}
        onChange={event => setPresetName(event.target.value)}
      />
      {error && <p className="mt-2 text-red-light text-xs">{error}</p>}
    </Dialog>
  )
}
