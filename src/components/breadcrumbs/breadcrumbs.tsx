import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { DropDown } from '@ui/dropdown'
import { Icon } from '@ui/icon'
import { showToast } from '@utils/notifications/showToast'
import breadcrumbsStore from './breadcrumbs.store'

export interface IBreadcrumbsProps {
  className?: string
  datasetName: string
  onChangeDataset: (datasetName: string) => void
  isXlDatasetAllowed: boolean
}

const copyLink = (dataset: string) => {
  copyToClipboard(
    `${window.origin}${window.location.pathname}?ds=${dataset}${
      variantStore.drawerVisible ? `&variant=${variantStore.index}` : ''
    }`,
  )

  showToast(t('ds.copied'), 'info')
}

export const Breadcrumbs = observer<IBreadcrumbsProps>(
  ({ className, datasetName, onChangeDataset, isXlDatasetAllowed }) => {
    useEffect(() => {
      breadcrumbsStore.setDatasetName(datasetName)
    }, [datasetName])

    const { dataset, secondaryOptions, ancestors } = breadcrumbsStore

    if (!dataset) {
      return null
    }

    const isDatasetInSecondary = secondaryOptions?.includes(datasetName)
    const isCurrentSingleOption =
      secondaryOptions?.length === 1 && isDatasetInSecondary
    const hasSecondarySelect = secondaryOptions && !isCurrentSingleOption

    return (
      <div
        className={cn(
          'relative flex flex-row items-center text-sm text-grey-blue',
          className,
        )}
      >
        <Link
          to="/"
          className="font-bold uppercase shrink-0 grow-0 hover:text-blue-bright"
        >
          {t('home.title')}
        </Link>
        {ancestors?.map(({ name, isXl }) => {
          const changeAllowed = isXlDatasetAllowed || !isXl
          return (
            <Fragment key={name}>
              <span className="mx-2">/</span>
              <div
                onClick={
                  changeAllowed ? () => onChangeDataset(name) : undefined
                }
                className={cn(
                  'shrink-1 min-w-0',
                  changeAllowed && 'cursor-pointer hover:text-blue-bright',
                )}
              >
                <div className="whitespace-nowrap overflow-hidden text-ellipsis ">
                  {name}
                </div>
              </div>
            </Fragment>
          )
        })}
        {(!isDatasetInSecondary || isCurrentSingleOption) && (
          <Fragment>
            <span className="mx-2">/</span>
            <div className={hasSecondarySelect ? 'shrink-1 min-w-0' : ''}>
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {datasetName}
              </div>
            </div>
          </Fragment>
        )}
        {hasSecondarySelect && (
          <Fragment>
            <span className="mx-2">/</span>
            <div className="shrink-0 grow-0">
              <DropDown
                options={secondaryOptions}
                value={isDatasetInSecondary ? dataset.name : ''}
                onSelect={option => onChangeDataset(option.value)}
                placeholder={t('header.selectSecondaryPlaceholder')}
              />
            </div>
          </Fragment>
        )}
        <Icon
          name="CopyLink"
          className="cursor-pointer ml-2 text-blue-bright"
          onClick={() => copyLink(datasetName)}
        />
      </div>
    )
  },
)

Breadcrumbs.displayName = 'Breadcrumbs'
