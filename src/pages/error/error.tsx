import { useHistory } from 'react-router-dom'

import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'

export const ErrorPage = () => {
  const history = useHistory()

  return (
    <div className="flex justify-center items-center flex-col h-full w-full pt-2 bg-blue-lighter text-white text-20">
      <span>{t('error.smthWentWrong')}</span>

      <Button
        text={t('error.getBack')}
        className="mt-3"
        variant={'secondary-dark'}
        onClick={() => history.push(Routes.Root)}
      />
    </div>
  )
}
