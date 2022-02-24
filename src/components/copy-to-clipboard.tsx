import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { showToast } from '@utils/notifications/showToast'

interface Props {
  text: string
  className?: Argument
}

export const CopyToClipboard = ({ text, className }: Props): ReactElement => {
  const copy = (event: any) => {
    event.stopPropagation()

    copyToClipboard(text)

    showToast(t('ds.copied'), 'info')
  }

  return (
    <Icon
      name="Copy"
      className={cn('cursor-pointer', className)}
      onClick={copy}
    />
  )
}
