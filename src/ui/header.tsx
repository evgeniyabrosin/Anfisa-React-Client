import { Fragment, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Option } from 'react-dropdown'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { Icon } from '@ui/icon'
import { Logo } from '@ui/logo'
import { DropDown } from './dropdown'

interface Props {
  children?: ReactElement | ReactNode
}

export const Header = observer(
  ({ children }: Props): ReactElement => {
    const [datasets, setDatasets] = useState([])
    const [xlDatasetName, setXlDatasetName] = useState('')
    const params = useParams()
    const ds = params.get('ds') || ''
    const history = useHistory()

    useEffect(() => {
      const initAsync = async () => {
        await dirinfoStore.fetchDirInfoAsync()

        const xlName = get(
          dirinfoStore,
          `dirinfo['ds-dict'][${ds}].ancestors[0][0]`,
          '',
        )

        setXlDatasetName(xlName)

        setDatasets(
          get(dirinfoStore, `dirinfo.ds-dict.${xlName}.secondary`, []),
        )
      }

      initAsync()
    }, [ds])

    const handleChangeDataset = (arg: Option) => {
      ds !== arg.value && history.push(`${Routes.WS}?ds=${arg.value}`)
    }

    const copyLink = () => {
      copyToClipboard(`${window.origin}${Routes.WS}?ds=${ds}`)

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

          <div className="text-grey-blue flex items-center">
            {xlDatasetName && datasets && (
              <Fragment>
                <span className="mx-2">/</span>

                <span>{xlDatasetName}</span>

                <span className="mx-2">/</span>

                <DropDown
                  options={datasets}
                  value={ds}
                  onSelect={handleChangeDataset}
                />

                <Icon
                  name="CopyLink"
                  className="cursor-pointer ml-2"
                  onClick={copyLink}
                />
              </Fragment>
            )}
          </div>
        </div>

        {children}

        <div className="text-white flex flex-row items-center">
          <div className="mr-2">Username</div>

          <Icon name="Circle" size={32} />
        </div>
      </div>
    )
  },
)
