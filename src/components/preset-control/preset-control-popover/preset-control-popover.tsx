import styles from './preset-control-popover.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { IPopoverBaseProps, Popover } from '@ui/popover'
import { ISolutionEntryDescription } from '@service-providers/common'
import { PresetControlList } from '../preset-control-list'

interface IPresetControlPopoverProps extends IPopoverBaseProps {
  isCreateDisabled?: boolean
  onCreate: () => void
  onApply: (presetName: string) => void
  onJoin?: (presetName: string) => void
  onSelect: (presetName: string) => void
  onModify: (presetName: string) => void
  onDelete: (presetName: string) => void
  presets: ISolutionEntryDescription[] | undefined
  selected: string
}

export const PresetControlPopover = ({
  presets,
  selected,
  isCreateDisabled,
  onCreate,
  onSelect,
  onApply,
  onJoin,
  onDelete,
  onModify,
  onClose,
  ...popoverProps
}: IPresetControlPopoverProps): ReactElement => {
  return (
    <Popover onClose={onClose} {...popoverProps}>
      <section className={styles.presetControlCard}>
        <header className={styles.presetControlCard__header}>
          <button
            disabled={isCreateDisabled}
            className={cn(
              styles.presetControlCard__createButton,
              isCreateDisabled &&
                styles.presetControlCard__createButton_disabled,
            )}
            onClick={() => {
              onClose?.()
              onCreate()
            }}
          >
            {t('presetControl.createNewPreset')}
          </button>
        </header>
        {presets && (
          <PresetControlList
            className={styles.presetControlCard__list}
            presets={presets}
            selected={selected}
            onSelect={onSelect}
            onModify={presetName => {
              onClose?.()
              onModify(presetName)
            }}
            onDelete={presetName => {
              onClose?.()
              onDelete(presetName)
            }}
          />
        )}
        <footer className={styles.presetControlCard__actions}>
          <Button
            className={styles.presetControlCard__button}
            variant="tertiary"
            text={t('general.cancel')}
            onClick={onClose}
          />
          {onJoin && (
            <Button
              className={styles.presetControlCard__button}
              variant="secondary"
              text={t('presetControl.join')}
              disabled={!selected}
              onClick={() => {
                onClose?.()
                onJoin(selected)
              }}
            />
          )}
          <Button
            className={styles.presetControlCard__button}
            text={t('presetControl.apply')}
            disabled={!selected}
            onClick={() => {
              onClose?.()
              onApply(selected)
            }}
          />
        </footer>
      </section>
    </Popover>
  )
}
