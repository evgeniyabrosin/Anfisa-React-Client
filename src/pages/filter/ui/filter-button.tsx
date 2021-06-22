import { ReactElement } from 'react'

import { t } from '@i18n'
import { Button, ButtonProps } from '@ui/button'

type Props = ButtonProps & {
  isOpen?: boolean
}

export const FilterButton = ({
  isOpen,
  refEl,
  className,
  ...rest
}: Props): ReactElement => (
  <Button
    text={t('general.filter')}
    refEl={refEl}
    size="sm"
    hasBackground={false}
    className="text-black"
    onClick={rest.onClick}
  />
)
