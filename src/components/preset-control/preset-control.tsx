import { ReactElement, useEffect, useMemo, useState } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { PresetControlPopover } from '@components/preset-control/preset-control-popover'
import { ISolutionEntryDescription } from '@service-providers/common'
import { PresetControlButton } from './preset-control-button'
import { PresetCreateDialog } from './preset-create-dialog'
import { PresetDeleteDialog } from './preset-delete-dialog'

interface IPresetControlProps {
  className?: string
  presets: ISolutionEntryDescription[] | undefined
  selected: string
  isCreateDisabled?: boolean
  onCreate: (presetName: string) => void
  onApply: (presetName: string) => void
  onJoin?: (presetName: string) => void
  onModify: (presetName: string) => void
  onDelete: (presetName: string) => void
}

export const PresetControl = ({
  className,
  presets,
  selected: selectedProp,
  isCreateDisabled,
  onCreate,
  onApply,
  onJoin,
  onModify,
  onDelete,
}: IPresetControlProps): ReactElement => {
  const [selected, setSelected] = useState(selectedProp)
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)
  const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal({
    presetName: '',
  })
  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  const isSelectedPresetNonStandard = useMemo(
    () =>
      !!selectedProp &&
      !presets?.find(({ name }) => name === selectedProp)?.standard,
    [selectedProp, presets],
  )

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  useEffect(() => {
    if (!isPopoverOpen) {
      setSelected(selectedProp)
    }
  }, [isPopoverOpen, selectedProp])

  return (
    <>
      <PresetControlButton
        className={className}
        presetName={selectedProp}
        isOpen={isPopoverOpen}
        isDeleteShown={isSelectedPresetNonStandard}
        onDeleteClick={() => {
          openDeleteDialog({ presetName: selectedProp })
        }}
        onClick={event =>
          isPopoverOpen ? closePopover() : setPopoverAnchor(event.currentTarget)
        }
        onMouseUp={event => event.stopPropagation()}
      />
      <PresetControlPopover
        isOpen={isPopoverOpen}
        isCreateDisabled={isCreateDisabled}
        onClose={closePopover}
        anchorEl={popoverAnchor}
        presets={presets}
        selected={selected}
        onCreate={() => openCreateDialog()}
        onSelect={setSelected}
        onJoin={onJoin}
        onApply={onApply}
        onModify={onModify}
        onDelete={presetName => openDeleteDialog({ presetName })}
      />
      <PresetDeleteDialog
        {...deleteDialog}
        onClose={closeDeleteDialog}
        onDelete={() => {
          closeDeleteDialog()
          if (deleteDialog.presetName) {
            onDelete(deleteDialog.presetName)
          }
        }}
      />
      <PresetCreateDialog
        {...createDialog}
        onClose={closeCreateDialog}
        onCreate={presetName => {
          closeCreateDialog()
          onCreate(presetName)
        }}
      />
    </>
  )
}
