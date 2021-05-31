import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

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
    return (
      <div className="bg-blue-dark flex flex-row justify-between items-center px-4 py-3">
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

            <span className="text-blue-bright font-bold uppercase text-xs">
              {t('home.title')}
            </span>
          </div>
        </Link>

        <div className="text-white flex flex-row items-center">
          <div className="mr-2">Username</div>

          <UserLogoDummy />
        </div>
      </div>
    )
  },
)
