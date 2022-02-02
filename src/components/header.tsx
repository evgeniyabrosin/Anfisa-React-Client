import { Fragment, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Option } from 'react-dropdown'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import variantStore from '@store/variant'
import { PageRoute, RouteNames, Routes } from '@router/routes.enum'
import { DropDown } from '@ui/dropdown'
import { Icon } from '@ui/icon'
import { Logo } from '@components/logo'
import { GlbPagesNames } from '@glb/glb-names'
import userIcon from '@images/thomas-hunt.jpg'

interface Props {
  children?: ReactElement | ReactNode
  source?: string
}

export const Header = observer(
  ({ children, source }: Props): ReactElement => {
    const [datasets, setDatasets] = useState([])
    const [xlDatasetName, setXlDatasetName] = useState('')
    const params = useParams()
    const ds = params.get('ds') || ''
    const history = useHistory()
    const isHomepage = window.location.pathname === Routes.Root
    const path: PageRoute = window.location.pathname as PageRoute

    useEffect(() => {
      const page: GlbPagesNames = RouteNames[path]

      filterStore.setMethod(page)
    }, [path])

    useEffect(() => {
      const initAsync = async () => {
        await dirinfoStore.fetchDirInfoAsync()

        const xlName = get(
          toJS(dirinfoStore.dirinfo),
          `['ds-dict'][${ds}].ancestors[0][0]`,
          '',
        )

        setXlDatasetName(xlName)

        setDatasets(
          get(toJS(dirinfoStore.dirinfo), `ds-dict.${xlName}.secondary`, []),
        )
      }

      source !== 'filter' && initAsync()
    }, [ds, source])

    const handleChangeDataset = (arg: Option) => {
      if (arg.value === ds) return

      ds !== arg.value &&
        history.push(`${history.location.pathname}?ds=${arg.value}`)
      datasetStore.setDatasetName(history.location.pathname)

      const dsName = arg.value

      if (dsName && !variantStore.dsName) {
        variantStore.setDsName(arg.value)
      }

      datasetStore.resetConditions()
      datasetStore.resetActivePreset()
      datasetStore.initDatasetAsync(dsName)
    }

    const copyLink = () => {
      copyToClipboard(
        `${window.origin}${history.location.pathname}?ds=${ds}${
          variantStore.drawerVisible ? `&variant=${variantStore.index}` : ''
        }`,
      )

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

              <span className="text-grey-blue whitespace-pre-line text-xs flex flex-col">
                <span>
                  {t('header.version.frontend', {
                    version: process.env.REACT_APP_VERSION,
                  })}
                </span>
                <span>
                  {t('header.version.backend', {
                    version: toJS(dirinfoStore.dirinfo).version,
                  })}
                </span>
              </span>
            </div>
          </Link>

          <div className="text-grey-blue flex items-center mr-2">
            {!isHomepage && xlDatasetName && datasets && (
              <Fragment>
                <div className="mx-4 bg-blue-lighter w-0.5 h-4" />

                <span className="font-bold uppercase text-xs text-blue-bright">
                  {t('home.title')}
                </span>

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
          <div className="mr-2">Thomas Hunt</div>

          <img src={userIcon} className="w-8 h-8 rounded-full" />
        </div>
      </div>
    )
  },
)
