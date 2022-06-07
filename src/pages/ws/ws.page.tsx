import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { NumberParam, useQueryParams } from 'use-query-params'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import { ExportPanelModal } from '@components/export-panel-modal'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { VariantsCount } from '@components/variants-count'
import { ModalSaveDataset } from '@pages/filter/dtree/components/modals/components/modal-save-dataset'
import { TCondition } from '@service-providers/common/common.interface'
import { ModalNotes } from './ui//table/modal-notes'
import { ControlPanel } from './ui/control-panel/control-panel'
import { TableVariants } from './ui/table/table-variants'
import { VariantDrawer } from './ui/variant-drawer'

export const WSPage = observer((): ReactElement => {
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

      conditions.forEach(condtion => filterStore.addCondition(condtion))
    }

    const initAsync = async () => {
      const dsName = params.get('ds') || ''

      if (dsName && !variantStore.dsName) {
        variantStore.setDsName(params.get('ds') ?? '')
      }

      datasetStore.setDatasetName(dsName)
    }

    initAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    mainTableStore.fixedStatAmount

  const isDrawerVisible = variantStore.drawerVisible

  return (
    <>
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}

      {variantStore.isModalNotesVisible && <ModalNotes />}

      <div className="h-full flex flex-col">
        <Header>
          <VariantsCount
            variantCounts={variantCounts}
            transcriptsCounts={transcriptsCounts}
            dnaVariantsCounts={dnaVariantsCounts}
          >
            <PopperButton
              ButtonElement={ExportReportButton}
              ModalElement={ExportPanelModal}
            />
          </VariantsCount>
        </Header>

        <ControlPanel />

        <div className="flex-grow flex overflow-hidden">
          <TableVariants className={cn(!isDrawerVisible && 'w-full')} />
          {isDrawerVisible && <VariantDrawer className="flex-1" />}
        </div>
      </div>
    </>
  )
})
