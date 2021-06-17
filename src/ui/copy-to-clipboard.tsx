import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import { Icon } from '@ui/icon'

interface Props {
  text: string
  colorClass?: string
}

export const CopyToClipboard = ({
  text,
  colorClass = 'text-blue-bright',
}: Props): ReactElement => {
  const copy = () => {
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
      className={cn('cursor-pointer', colorClass)}
      onClick={copy}
    />
  )
}
