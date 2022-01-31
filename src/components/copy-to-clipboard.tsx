import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import cn, { Argument } from 'classnames'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import { Icon } from '@ui/icon'

interface Props {
  text: string
  className?: Argument
}

export const CopyToClipboard = ({ text, className }: Props): ReactElement => {
  const copy = (event: any) => {
    event.stopPropagation()

    copyToClipboard(text)

    toast.info(t('ds.copied'), {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    })
  }

  return (
    <Icon
      name="Copy"
      className={cn('cursor-pointer', className)}
      onClick={copy}
    />
  )
}
