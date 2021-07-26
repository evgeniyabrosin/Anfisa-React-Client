import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

interface Props {
  isOpen?: boolean
  refEl: any
  className?: Argument
  onClick?: () => void
}

export const ExportReportButton = ({
  isOpen,
  refEl,
  className,
  ...rest
}: Props): ReactElement => (
  <Button
    text={t('general.exportReport')}
    refEl={refEl}
    size="sm"
    prepend={<Icon name="Export" />}
    onClick={rest.onClick}
    append={
      <Icon
        name="Arrow"
        className={cn('transform', isOpen ? 'rotate-90' : '-rotate-90')}
      />
    }
  />
)
