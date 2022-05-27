import styles from './refiner.page.module.css'

import { ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset/dataset'
import dirInfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import mainTableStore from '@store/ws/main-table.store'
import { ExportPanelModal } from '@components/export-panel-modal'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { ErrorPage } from '@pages/error/error.page'
import { FilterControl } from '@pages/filter/common/filter-control/filter-control'
import { ModalSaveDataset } from '@pages/filter/dtree/components/modals/components/modal-save-dataset'
import { ModalViewVariants } from '@pages/filter/dtree/components/modals/components/modal-view-variants'
import { FilterRefiner } from '@pages/filter/refiner/components/filter-refiner'
import { FilterControlOptionsNames } from '../common/filter-control/filter-control.const'
import { SolutionControlRefiner } from './components/solution-control-refiner'

export const RefinerPage = withErrorBoundary(
  observer((): ReactElement => {
    const { isXL } = datasetStore

    const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
      mainTableStore.fixedStatAmount

    useDatasetName()

    useEffect(() => {
      return () => {
        dirInfoStore.resetData()
      }
    }, [])

    return (
      <div className={styles.refinerPage}>
        {dtreeStore.isModalViewVariantsVisible && <ModalViewVariants />}
        {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}

        <Header className={styles.refinerPage__header}>
          <VariantsCount
            variantCounts={
              isXL ? toJS(datasetStore.dsInfoData?.total) : variantCounts
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

        <FilterControl
          pageName={FilterControlOptionsNames[GlbPagesNames.Refiner]}
          SolutionControl={SolutionControlRefiner}
          isBackwardAllowed={filterStore.actionHistory.isBackwardAllowed}
          isForwardAllowed={filterStore.actionHistory.isForwardAllowed}
          goForward={filterStore.actionHistory.goForward}
          goBackward={filterStore.actionHistory.goBackward}
          className={styles.refinerPage__controls}
        />

        <FilterRefiner className={styles.refinerPage__refiner} />
      </div>
    )
  }),
  {
    fallback: <ErrorPage />,
  },
)
