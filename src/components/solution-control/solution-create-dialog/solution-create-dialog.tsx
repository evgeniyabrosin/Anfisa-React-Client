import { ReactElement, useEffect, useMemo, useState } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'
import { ISolutionEntryDescription } from '@service-providers/common'

interface ISolutionCreateDialogProps {
  solutions: ISolutionEntryDescription[] | undefined
  isOpen?: boolean
  controlName: string
  onClose: () => void
  onCreate: (solutionName: string) => void
}

export const SolutionCreateDialog = ({
  solutions,
  isOpen,
  controlName,
  onClose,
  onCreate,
}: ISolutionCreateDialogProps): ReactElement => {
  const [solutionName, setSolutionName] = useState('')

  const error = useMemo(
    () => solutions?.some(solution => solution.name === solutionName),
    [solutionName, solutions],
  )

  useEffect(() => {
    !isOpen && setSolutionName('')
  }, [isOpen])

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('solutionControl.createDialog.title', { controlName })}
      applyText={t('general.create')}
      isApplyDisabled={error || !solutionName}
      onApply={() => onCreate(solutionName)}
    >
      <Input
        value={solutionName}
        label={t('solutionControl.createDialog.controlName', { controlName })}
        placeholder={t('solutionControl.createDialog.controlNamePlaceholder', {
          controlName,
        })}
        onChange={event => setSolutionName(event.target.value)}
      />
      {error && (
        <div className="text-red-secondary text-12">
          {t('solutionControl.createDialog.solutionNameAlreadyExists', {
            controlName,
            solutionName,
          })}
        </div>
      )}
    </Dialog>
  )
}
