import { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { CircleSvg } from '@icons/circle'
import { Logo } from '@icons/logo'

const UserLogoDummy = () => (
  <CircleSvg fill={'white'} style={{ width: '32px', height: '32px' }} />
)

export const Header = observer(
  (): ReactElement => {
    const params = useParams()
    const ds = params.get('ds')

    useEffect(() => {
      dirinfoStore.fetchDirInfoAsync()
    }, [])

    return (
      <div className="bg-blue-dark flex flex-row justify-between items-center px-4 py-3">
        <div className="flex flex-row justify-between items-center">
          <Link to={Routes.Root}>
            <div className="flex items-center text-white">
              <Logo mode="white" className="mr-4" />

              <span className="text-grey-blue">
                {dirinfoStore.dirinfo.version as string}
              </span>

              <div
                className="mx-4 bg-blue-lighter"
                style={{ width: '2px', height: '16px' }}
              />

              <span className="font-bold uppercase text-xs text-blue-bright">
                {t('home.title')}
              </span>
            </div>
          </Link>

          {ds && (
            <span className="font-bold uppercase text-xs text-grey-blue">
              <span className="mx-2">/</span>

              <span>{ds}</span>
            </span>
          )}
        </div>

        <div className="text-white flex flex-row items-center">
          <div className="mr-2">Username</div>

          <UserLogoDummy />
        </div>
      </div>
    )
  },
)
