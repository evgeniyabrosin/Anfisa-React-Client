import React, { ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import { ExportPanelModal } from '@components/export-panel-modal'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { VariantsCount } from '@components/variants-count'
import { ErrorPage } from '@pages/error/error'
import { FilterControl } from '@pages/filter/ui/filter-control/filter-control'
import { FilterRefiner } from '@pages/filter/ui/filter-refiner'
import { ModalSaveDataset } from '@pages/filter/ui/query-builder/ui/modal-save-dataset'
import { TableModal } from '@pages/filter/ui/TableModal'

const RefinerPage = observer((): ReactElement => {
  const isXL = datasetStore.isXL

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    datasetStore.fixedStatAmount

  useDatasetName()

  useEffect(() => {
    const initAsync = async () => {
      await dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)

      if (!datasetStore.isXL) datasetStore.fetchWsListAsync()
    }

    initAsync()

    return () => {
      dirinfoStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {dtreeStore.isTableModalVisible && <TableModal />}
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}
      <Header>
        <VariantsCount
          variantCounts={
            isXL ? (toJS(dirinfoStore.dsinfo).total as number) : variantCounts
          }
          transcriptsCounts={transcriptsCounts}
          dnaVariantsCounts={dnaVariantsCounts}
          showDnaVariants={!isXL}
          showTranscripts={!isXL}
        >
          <PopperButton
            ButtonElement={ExportReportButton}
            ModalElement={ExportPanelModal}
          />
        </VariantsCount>
      </Header>
      <FilterControl />
      <FilterRefiner />
    </>
  )
})

export default withErrorBoundary(RefinerPage, {
  fallback: <ErrorPage />,
})
