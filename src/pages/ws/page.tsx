import { Fragment, ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { observer } from 'mobx-react-lite'
import { NumberParam, useQueryParams } from 'use-query-params'

import { formatNumber } from '@core/format-number'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import variantStore from '@store/variant'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ExportPanelModal } from '@components/export-panel-modal'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { VariantDrawer } from '@components/variant/drawer'
import { ErrorPage } from '@pages/error/error'
import { ModalSaveDataset } from '@pages/filter/ui/query-builder/ui/modal-save-dataset'
import { TCondition } from '@service-providers/common/common.interface'
import { ControlPanel } from './ui/control-panel'
import { ModalNotes } from './ui/modal-notes'
import { TableVariants } from './ui/table-variants'

const WSPage = observer((): ReactElement => {
  const params = useParams()
  const stringifyedConditions = params.get('conditions')
  const { conditions } = filterStore

  useDatasetName()

  const [query] = useQueryParams({
    variant: NumberParam,
  })

  const { variant } = query

  Number.isInteger(variant) && variantStore.setIndex(variant as number)

  useEffect(() => {
    if (stringifyedConditions && !conditions.length) {
      const conditions: TCondition[] = JSON.parse(stringifyedConditions)

      conditions.forEach(condtion => filterStore.addFilterBlock(condtion))
    }

    const initAsync = async () => {
      const dsName = params.get('ds') || ''

      if (dsName && !variantStore.dsName) {
        variantStore.setDsName(params.get('ds') ?? '')
      }

      await datasetStore.initDatasetAsync(dsName)
    }

    initAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    datasetStore.fixedStatAmount

  return (
    <Fragment>
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}

      {variantStore.isModalNotesVisible && <ModalNotes />}

      <div className="h-full flex flex-col">
        <Header>
          <div className="text-white flex-grow flex justify-end pr-6">
            <span
              className="text-12 leading-14px text-white mt-2 ml-auto font-bold"
              data-testid={MainTableDataCy.numVariants}
            >
              {t('filter.variants', {
                all: formatNumber(variantCounts),
              })}
            </span>

            <span className="text-12 leading-14px text-white border-l-2 border-blue-lighter mt-2 ml-2 pl-2 font-bold">
              {t('filter.transcribedVariants', {
                all: formatNumber(dnaVariantsCounts),
              })}
            </span>

            <span className="text-12 leading-14px text-white border-l-2 border-blue-lighter mt-2 ml-2 pl-2 mr-6 font-bold">
              {t('filter.transcripts', {
                all: formatNumber(transcriptsCounts),
              })}
            </span>

            <PopperButton
              ButtonElement={ExportReportButton}
              ModalElement={ExportPanelModal}
            />
          </div>
        </Header>

        <ControlPanel />

        <div className="flex-grow flex overflow-hidden">
          <TableVariants />

          <VariantDrawer />
        </div>
      </div>
    </Fragment>
  )
})

export default withErrorBoundary(WSPage, {
  fallback: <ErrorPage />,
})
