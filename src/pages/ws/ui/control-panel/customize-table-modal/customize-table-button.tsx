import { MouseEvent, ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

interface ICustomizeTableButtonProps {
  refEl: any
  isOpen?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void
  dataTestId?: string
}

export const CustomizeTableButton = ({
  refEl,
  isOpen,
  onClick,
  onMouseUp,
}: ICustomizeTableButtonProps): ReactElement => (
  <Button
    dataTestId={MainTableDataCy.customizeTable}
    refEl={refEl}
    onClick={onClick}
    onMouseUp={onMouseUp}
    text={t('ds.customizeTable')}
    variant="secondary-dark"
    size="sm"
    prepend={<Icon name="Settings" size={14} className="text-blue-bright" />}
    append={
      <Icon
        name="Arrow"
        size={14}
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)
