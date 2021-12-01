import React, { Fragment, ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { ExportPanel } from '@components/export-panel'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { FilterControl } from '@pages/filter/ui/filter-control'
import { FilterRefiner } from '@pages/filter/ui/filter-refiner'

export const RefinerPage = observer(
  (): ReactElement => {
    const isXL = datasetStore.isXL
    const statAmount = toJS(datasetStore.statAmount)

    useDatasetName()

    useEffect(() => {
      const initAsync = async () => {
        await datasetStore.fetchDsStatAsync()

        if (Object.keys(toJS(dirinfoStore.dsinfo)).length === 0) {
          await dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)
        }
      }

      initAsync()

      return () => {
        datasetStore.resetData()
        filterStore.resetData()
        dirinfoStore.resetData()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Fragment>
        <Header source="refiner">
          <div className="text-white flex-grow flex justify-end pr-6">
            <span className="text-12 leading-14px text-white mt-2 ml-auto font-bold">
              {t('filter.variants', {
                all: isXL ? toJS(dirinfoStore.dsinfo).total : statAmount[0],
              })}
            </span>

            {!isXL && (
              <React.Fragment>
                <span className="header-variants-info">
                  {t('filter.transcribedVariants', {
                    all: statAmount[1],
                  })}
                </span>

                <span className="header-variants-info">
                  {t('filter.transcripts', {
                    all: statAmount[2],
                  })}
                </span>
              </React.Fragment>
            )}

            <div className="ml-2">
              <PopperButton
                ButtonElement={ExportReportButton}
                ModalElement={ExportPanel}
              />
            </div>
          </div>
        </Header>
        <FilterControl />
        <FilterRefiner />
      </Fragment>
    )
  },
)
