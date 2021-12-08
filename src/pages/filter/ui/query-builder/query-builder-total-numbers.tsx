import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'

export const QueryBuilderTotalNumbers = observer(
  (): ReactElement => {
    const variants = dirinfoStore.dsinfo.total

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

    const getDerivedVariants = (type: string) => {
      if (!dtreeStore.isCountsReceived) return '...'

      const sum = (prevElement: any, currElement: any) => {
        const prevNumber = Number.isInteger(prevElement) ? prevElement : 0
        const currNumber = Number.isInteger(currElement) ? currElement : 0

        return prevNumber + currNumber
      }

      const acceptedVariants = dtreeStore.stepData
        .map(step => !step.excluded && step.difference)
        .reduce(sum)

      const rejectedVariants = dtreeStore.stepData
        .map(step => step.excluded && step.difference)
        .reduce(sum)

      return type === 'excluded' ? rejectedVariants : acceptedVariants
    }

    return (
      <div className="flex items-center p-4 border-b border-grey-light bg-blue-dark justify-between">
        <div className="flex flex-wrap">
          <span className="font-bold text-white w-full">
            {t('dtree.results')}
          </span>

          <span className="text-12 leading-14px text-grey-blue mt-2">
            {t('ds.totalVariants')}
            {variants}
          </span>

          {dtreeStore.stepData.length > 0 && (
            <Fragment>
              <div className="text-12 leading-14px text-grey-blue mt-2 ml-2">
                <span>{t('dtree.acceptedVariants')}</span>

                <span>{getDerivedVariants('included') || 0}</span>
              </div>

              <div className="text-12 leading-14px text-grey-blue mt-2 ml-2">
                <span>{t('dtree.rejectedVariants')}</span>

                <span>{getDerivedVariants('excluded') || 0}</span>
              </div>
            </Fragment>
          )}
        </div>
        <div className="flex">
          {hasReturnedVariants && (
            <Button
              onClick={() => openTableModal(true)}
              text={t('dtree.viewReturnedVariants')}
              hasBackground={false}
              className="ml-auto hover:bg-blue-bright"
            />
          )}

          {hasStartVariants && (
            <Button
              onClick={() => openTableModal(false)}
              text={t('dtree.viewVariants')}
              hasBackground={false}
              className="ml-5 hover:bg-blue-bright"
            />
          )}
        </div>
      </div>
    )
  },
)
