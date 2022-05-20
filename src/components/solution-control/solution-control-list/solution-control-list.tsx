import styles from './solution-control-list.module.css'

import { ReactElement, useState } from 'react'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { ISolutionEntryDescription } from '@service-providers/common'

interface ISolutionControlListProps {
  className?: string
  solutions: ISolutionEntryDescription[]
  selected?: string
  onSelect: (solutionName: string) => void
  onModify: (solutionName: string) => void
  onDelete: (solutionName: string) => void
}

export const SolutionControlList = ({
  className,
  solutions,
  selected,
  onSelect,
  onModify,
  onDelete,
}: ISolutionControlListProps): ReactElement => {
  const [contextMenuItem, setContextMenuItem] =
    useState<{
      name: string
      element: HTMLElement
    } | null>(null)

  const closeContextMenu = () => {
    setContextMenuItem(null)
  }

  return (
    <>
      <MenuList className={className} wrap="nowrap">
        {solutions?.map(({ name, standard }) => (
          <MenuListItem
            key={name}
            label={name}
            isSelected={selected === name}
            onClick={() => onSelect(name)}
            actions={
              !standard && (
                <button
                  className={styles.contextMenuButton}
                  onClick={event => {
                    onSelect(name)
                    setContextMenuItem({ name, element: event.currentTarget })
                  }}
                >
                  <Icon name="Ellipsis" size={12} />
                </button>
              )
            }
          />
        ))}
      </MenuList>
      <Popover
        isOpen={!!contextMenuItem}
        anchorEl={contextMenuItem?.element}
        placement="bottom-end"
        onClose={closeContextMenu}
      >
        <div
          className={styles.menuCard}
          onMouseUp={event => event.stopPropagation()}
        >
          <MenuList isDense>
            <MenuListItem
              label={t('solutionControl.modify')}
              onClick={() => {
                closeContextMenu()
                onModify(contextMenuItem?.name ?? '')
              }}
            />
            <MenuListItem
              label={t('solutionControl.delete')}
              onClick={() => {
                closeContextMenu()
                onDelete(contextMenuItem?.name ?? '')
              }}
            />
          </MenuList>
        </div>
      </Popover>
    </>
  )
}
