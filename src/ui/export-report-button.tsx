import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { t } from '@i18n'
import { ArrowSvg } from '@icons/arrow'
import { ExportSvg } from '@icons/export'
import { Button } from './button'

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
    prepend={<ExportSvg />}
    onClick={rest.onClick}
    append={<ArrowSvg direction={isOpen ? 'top' : 'down'} />}
  />
)
