import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import { CopySvg } from '@ui/icons/copy'

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

  return <CopySvg onClick={copy} className={cn('cursor-pointer', colorClass)} />
}
