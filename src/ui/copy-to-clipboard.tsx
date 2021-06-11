import { ReactElement } from 'react'
import { toast } from 'react-toastify'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import { CopySvg } from '@ui/icons/copy'

interface Props {
  text: string
}

export const CopyToClipboard = ({ text }: Props): ReactElement => {
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
    <CopySvg onClick={copy} className="ml-1 cursor-pointer text-blue-bright" />
  )
}
