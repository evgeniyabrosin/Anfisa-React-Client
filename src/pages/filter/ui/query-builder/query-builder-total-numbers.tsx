import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'

export const QueryBuilderTotalNumbers = observer(
  (): ReactElement => {
    const [allVariants, transcribedVariants, allTranscripts] = get(
      datasetStore,
      'statAmount',
      [],
    )

    const stepData = dtreeStore.stepData

    const stepIndex = stepData.findIndex(
      element => element.isActive || element.isReturnedVariantsActive,
    )

    const returnedVariants = stepData[stepIndex]?.difference
    const startVariants = stepData[stepIndex]?.startFilterCounts
    const hasReturnedVariants = Boolean(returnedVariants)
    const hasStartVariants = Boolean(startVariants)

    const openTableModal = (isReturnedVariants = true) => {
      const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
      const nextStepIndex = isReturnedVariants ? indexForApi + 1 : indexForApi

      dtreeStore.openTableModal(nextStepIndex)
    }

    return (
      <div className="flex items-center p-4 border-b border-grey-light bg-blue-dark justify-between">
        <div className="flex flex-wrap">
          <span className="font-bold text-white w-full">
            {t('dtree.results')}
          </span>

          <span className="text-12 leading-14px text-grey-blue mt-2">
            {t('filter.variants', {
              all: allVariants,
            })}
          </span>

          {transcribedVariants && (
            <span className="text-12 leading-14px text-grey-blue border-l-2 mt-2 ml-2 pl-2">
              {t('filter.transcribedVariants', {
                all: transcribedVariants,
              })}
            </span>
          )}

          {allTranscripts && (
            <span className="text-12 leading-14px text-grey-blue border-l-2 mt-2 ml-2 pl-2">
              {t('filter.transcripts', {
                all: allTranscripts,
              })}
            </span>
          )}
        </div>
        <div className="flex">
          {hasReturnedVariants && (
            <Button
              onClick={() => openTableModal(true)}
              text="View returned variants"
              hasBackground={false}
              className="ml-auto hover:bg-blue-bright"
            />
          )}

          {hasStartVariants && (
            <Button
              onClick={() => openTableModal(false)}
              text="View variants"
              hasBackground={false}
              className="ml-5 hover:bg-blue-bright"
            />
          )}
        </div>
      </div>
    )
  },
)
