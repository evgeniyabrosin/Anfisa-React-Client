import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

interface Props {
  refEl: any
  isOpen?: boolean
  onClick?: () => void
  dataTestId?: string
}

export const TableProperiesButton = ({
  refEl,
  isOpen,
  onClick,
}: Props): ReactElement => (
  <Button
    dataTestId={MainTableDataCy.customizeTable}
    refEl={refEl}
    onClick={onClick}
    text={t('ds.customizeTable')}
    hasBackground={false}
    prepend={<Icon name="Settings" className="text-blue-bright" />}
    append={
      <Icon
        name="Arrow"
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)
