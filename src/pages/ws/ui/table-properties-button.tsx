import { ReactElement } from 'react'

import { t } from '@i18n'
import { ArrowSvg } from '@icons/arrow'
import { Button } from '@ui/button'
import { SettingsSvg } from '@ui/icons/settings'

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
    prepend={<SettingsSvg />}
    append={<ArrowSvg fill="white" direction={isOpen ? 'top' : 'down'} />}
  />
)
