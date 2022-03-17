import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

export const FileMissing = (): ReactElement => {
  return (
    <div className="flex justify-center items-center flex-col h-full w-full pt-2 bg-blue-lighter text-white text-20">
      <span>{t('igv.filesNotFound')}</span>

      <Link to={Routes.Root}>
        <Button
          text={t('error.getBack')}
          className="mt-3"
          variant={'secondary-dark'}
          prepend={<Icon name="Arrow" />}
        />
      </Link>
    </div>
  )
}
