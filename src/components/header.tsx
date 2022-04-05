import { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { Option } from 'react-dropdown'
import { Link, useHistory } from 'react-router-dom'
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
import { showToast } from '@utils/notifications/showToast'

interface Props {
  children?: ReactElement | ReactNode
}

const allowedXlDatasetRotes: PageRoute[] = [Routes.Refiner, Routes.Filter]

export const Header = observer(({ children }: Props): ReactElement => {
  const params = useParams()
  const ds = params.get('ds') || ''
  const history = useHistory()
  const isHomepage = window.location.pathname === Routes.Root
  const path: PageRoute = window.location.pathname as PageRoute
  const isXlDatasetAllowed = allowedXlDatasetRotes.includes(path)

  useEffect(() => {
    const page: GlbPagesNames = RouteNames[path]

    filterStore.setMethod(page)
  }, [path])

  useEffect(() => {
    dirinfoStore.fetchDirInfoAsync()
  }, [ds])

  const ancestorDataset = dirinfoStore.getAncestorDataset(ds)
  const secondaryDatasets: (Option | string)[] | undefined =
    ancestorDataset?.secondary ?? []

  if (
    ancestorDataset &&
    (ancestorDataset.kind !== 'xl' || isXlDatasetAllowed)
  ) {
    secondaryDatasets.unshift({
      label: '\u00a0',
      value: ancestorDataset.name,
    })
  }

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

    showToast(t('ds.copied'), 'info')
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
          {!isHomepage && ancestorDataset && (
            <Fragment>
              <div className="mx-4 bg-blue-lighter w-0.5 h-4" />

              <span className="font-bold uppercase text-xs text-blue-bright">
                {t('home.title')}
              </span>

              <span className="mx-2">/</span>

              <span>{ancestorDataset.name}</span>

              {secondaryDatasets && secondaryDatasets.length > 0 && (
                <Fragment>
                  <span className="mx-2">/</span>

                  <DropDown
                    options={secondaryDatasets}
                    value={ds}
                    onSelect={handleChangeDataset}
                  />
                </Fragment>
              )}
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
})
