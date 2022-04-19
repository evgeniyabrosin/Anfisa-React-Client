import React, { Fragment, ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import { ExportPanelModal } from '@components/export-panel-modal'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { ErrorPage } from '@pages/error/error'
import { FilterControl } from '@pages/filter/common/filter-control/filter-control'
import { TableModal } from '@pages/filter/dtree/components/modals/components/TableModal'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import { ModalSaveDataset } from '../dtree/components/modals/components/modal-save-dataset'

const RefinerPage = observer((): ReactElement => {
  const isXL = datasetStore.isXL

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    datasetStore.fixedStatAmount

  useDatasetName()

  useEffect(() => {
    const initAsync = async () => {
      await dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)

      datasetStore.fetchDsStatAsync()

      if (!datasetStore.isXL) datasetStore.fetchWsListAsync()
    }

    initAsync()

    return () => {
      dirinfoStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      {dtreeStore.isTableModalVisible && <TableModal />}
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}
      <Header>
        <div className="text-white flex-grow flex justify-end pr-6">
          <span className="text-12 leading-14px text-white mt-2 ml-auto font-bold">
            {t('filter.variants', {
              all: formatNumber(
                isXL
                  ? (toJS(dirinfoStore.dsinfo).total as number)
                  : variantCounts,
              ),
            })}
          </span>

          {!isXL && (
            <React.Fragment>
              <span className="header-variants-info">
                {t('filter.transcribedVariants', {
                  all: formatNumber(dnaVariantsCounts),
                })}
              </span>

              <span className="header-variants-info">
                {t('filter.transcripts', {
                  all: formatNumber(transcriptsCounts),
                })}
              </span>
            </React.Fragment>
          )}

          <div className="ml-2">
            <PopperButton
              ButtonElement={ExportReportButton}
              ModalElement={ExportPanelModal}
            />
          </div>
        </div>
      </Header>
      <FilterControl />
      <FilterRefiner />
    </Fragment>
  )
})

export default withErrorBoundary(RefinerPage, {
  fallback: <ErrorPage />,
})
