import { Fragment, ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import {
  ArrayParam,
  NumberParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import { HistoryLocationState } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import variantStore from '@store/variant'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ExportPanel } from '@components/export-panel'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { VariantDrawer } from '@components/variant/drawer'
import { ErrorPage } from '@pages/error/error'
import { ModalSaveDataset } from '@pages/filter/ui/query-builder/ui/modal-save-dataset'
import { ControlPanel } from './ui/control-panel'
import { ModalNotes } from './ui/modal-notes'
import { TableVariants } from './ui/table-variants'

const WSPage = observer(
  (): ReactElement => {
    const params = useParams()

    useDatasetName()

    const historyLocationState = useHistory().location
      .state as HistoryLocationState

    const prevPage = historyLocationState?.prevPage || ''

    const [query] = useQueryParams({
      variant: NumberParam,
      filters: withDefault(ArrayParam, []),
    })

    const { filters, variant } = query

    Number.isInteger(variant) && variantStore.setIndex(variant as number)

    useEffect(() => {
      const initAsync = async () => {
        const dsName = params.get('ds') || ''

        if (filters.length > 0) {
          const conditions: any = []

          filters.forEach(filter => {
            const splitted: any = filter?.split('=')
            const name = splitted[0]
            const value = splitted[1].split(',')
            const condition = [FilterKindEnum.Enum, name, '', value]

            conditions.push(condition)
          })
          datasetStore.setConditionsAsync(conditions)
        }

        if (dsName && !variantStore.dsName) {
          variantStore.setDsName(params.get('ds') ?? '')
        }

        await datasetStore.initDatasetAsync(dsName, prevPage)
      }

      initAsync()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [allVariants, transcribedVariants, allTranscripts] = get(
      datasetStore,
      'statAmount',
      [],
    )

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
                  all: allVariants,
                })}
              </span>

              <span className="text-12 leading-14px text-white border-l-2 border-blue-lighter mt-2 ml-2 pl-2 font-bold">
                {t('filter.transcribedVariants', {
                  all: transcribedVariants,
                })}
              </span>

              <span className="text-12 leading-14px text-white border-l-2 border-blue-lighter mt-2 ml-2 pl-2 mr-6 font-bold">
                {t('filter.transcripts', {
                  all: allTranscripts,
                })}
              </span>

              <PopperButton
                ButtonElement={ExportReportButton}
                ModalElement={ExportPanel}
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
  },
)

export default withErrorBoundary(WSPage, {
  fallback: <ErrorPage />,
})
