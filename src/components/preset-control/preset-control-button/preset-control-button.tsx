import styles from './preset-control-button.module.css'

import { ButtonHTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Icon } from '@ui/icon'

interface IPresetControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  presetName: string | undefined
  isOpen: boolean
  isDeleteShown: boolean
  onDeleteClick: () => void
}

export const PresetControlButton = ({
  className,
  presetName,
  isOpen,
  isDeleteShown,
  onDeleteClick,
  ...buttonProps
}: IPresetControlButtonProps): ReactElement => {
  return (
    <button
      className={cn(styles.presetControlButton, className)}
      {...buttonProps}
    >
      <span className={styles.presetControlButton__label}>
        {presetName || t('presetControl.selectPreset')}
      </span>
      <span
        className={cn(
          styles.presetControlButton__icon,
          isDeleteShown && styles.presetControlButton__icon_delete,
        )}
      >
        {isDeleteShown ? (
          <Icon
            name="Delete"
            size={16}
            onClick={event => {
              event.stopPropagation()
              onDeleteClick()
            }}
          />
        ) : (
          <span
            className={cn(
              styles.presetControlButton__arrow,
              isOpen && styles.presetControlButton__arrow_open,
            )}
          />
        )}
      </span>
    </button>
  )
}
