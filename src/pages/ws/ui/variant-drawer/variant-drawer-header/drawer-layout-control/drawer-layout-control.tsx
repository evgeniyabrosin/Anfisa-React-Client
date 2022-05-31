import styles from './drawer-layout-control.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import {
  IVariantDrawerGridPreset,
  VariantDrawerLayoutMode,
} from '../../variant-drawer.interface'
import { PresetMenu } from './preset-menu'
import { SavePresetDialog } from './save-preset-dialog'

interface IDrawerLayoutControlProps {
  className?: string
  layoutMode: VariantDrawerLayoutMode
  onChangeLayoutMode: (mode: VariantDrawerLayoutMode) => void
  gridPresets: IVariantDrawerGridPreset[]
  onSaveGridPreset?: (presetName: string) => void
  onChangeGridPreset: (presetName: string) => void
  windowsOpenState: boolean
  onWindowsToggle: (state: boolean) => void
}

export const DrawerLayoutControl = ({
  className,
  gridPresets,
  layoutMode,
  onChangeLayoutMode,
  onSaveGridPreset,
  onChangeGridPreset,
  windowsOpenState,
  onWindowsToggle,
}: IDrawerLayoutControlProps): ReactElement => {
  const [presetMenuAnchorEl, setPresetMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const [savePresetDialog, openSavePresetDialog, closeSavePresetDialog] =
    useModal()

  const closePresetMenu = () => {
    setPresetMenuAnchorEl(null)
  }

  return (
    <div className={cn(styles.layoutControl, className)}>
      {layoutMode === VariantDrawerLayoutMode.Grid &&
        windowsOpenState &&
        onSaveGridPreset && (
          <Button
            text={t('variant.savePreset')}
            className="whitespace-nowrap mr-4"
            size="xs"
            textSize="xs"
            variant="secondary-dark"
            onClick={openSavePresetDialog}
          />
        )}
      <button
        className={styles.layoutControl__button}
        onClick={() => onWindowsToggle(!windowsOpenState)}
      >
        <Icon name={windowsOpenState ? 'Collapse' : 'Expand'} size={20} />
      </button>
      <Divider orientation="vertical" spacing="dense" />
      <button
        className={cn(
          styles.layoutControl__button,
          layoutMode === VariantDrawerLayoutMode.Grid &&
            styles.layoutControl__button_active,
          styles.gridPresetButton,
        )}
        onClick={event => setPresetMenuAnchorEl(event.currentTarget)}
      >
        <Icon name="List" />
        <Icon name="ArrowDownXs" className={styles.gridPresetButton__arrow} />
      </button>
      <button
        className={cn(
          styles.layoutControl__button,
          layoutMode === VariantDrawerLayoutMode.Gallery &&
            styles.layoutControl__button_active,
          'ml-2',
        )}
        onClick={() => onChangeLayoutMode(VariantDrawerLayoutMode.Gallery)}
      >
        <Icon name="Gallery" size={20} />
      </button>
      <PresetMenu
        isOpen={!!presetMenuAnchorEl}
        onClose={closePresetMenu}
        anchorEl={presetMenuAnchorEl}
        presets={gridPresets}
        onSelect={presetName => {
          onChangeLayoutMode(VariantDrawerLayoutMode.Grid)
          onChangeGridPreset(presetName)
          closePresetMenu()
        }}
      />
      {onSaveGridPreset && (
        <SavePresetDialog
          {...savePresetDialog}
          onClose={closeSavePresetDialog}
          onSave={presetName => {
            onSaveGridPreset(presetName)
            closeSavePresetDialog()
          }}
          presets={gridPresets}
        />
      )}
    </div>
  )
}
