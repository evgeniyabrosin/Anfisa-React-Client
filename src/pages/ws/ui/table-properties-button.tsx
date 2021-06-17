import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

interface Props {
  refEl: any
  isOpen?: boolean
  onClick?: () => void
}

export const TableProperiesButton = ({
  refEl,
  isOpen,
  onClick,
}: Props): ReactElement => (
  <Button
    refEl={refEl}
    onClick={onClick}
    text={t('ds.customizeTable')}
    hasBackground={false}
    prepend={<Icon name="Settings" className="text-blue-bright" />}
    append={
      <Icon
        name="Arrow"
        className={cn('transform', isOpen ? 'rotate-90' : '-rotate-90')}
      />
    }
  />
)
