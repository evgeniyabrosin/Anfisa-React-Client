import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import Tooltip from 'rc-tooltip'
import styled from 'styled-components'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { theme } from '@theme'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/active-step.store'

const StartAmount = styled.div`
  font-size: 13px;
  font-weight: 700;
`

const CircleStartThread = styled.div`
  position: absolute;
  top: 13px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
`

const SubCircleThread = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background: white;
`

const LineThread = styled.div`
  width: 6px;
  height: 100%;
`

const ExcludeTurn = styled.div<{ isIncluded: boolean }>`
  position: absolute;
  top: 29px;
  margin-right: 14px;
  display: flex;
  width: 20px;
  height: 60px;
  border-bottom: 6.5px solid
    ${props =>
      props.isIncluded
        ? theme('colors.green.secondary')
        : theme('colors.purple.bright')};
  border-right: 6.5px solid
    ${props =>
      props.isIncluded
        ? theme('colors.green.secondary')
        : theme('colors.purple.bright')};
  border-bottom-right-radius: 20px;
`

const ExcludeAmount = styled.div<{ isIncluded: boolean }>`
  width: auto;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: ${props =>
    props.isIncluded
      ? theme('colors.green.secondary')
      : theme('colors.purple.bright')};
`

const DifferenceCounts = styled.span<{
  isIncluded: boolean
}>`
  border-bottom: 2px dashed
    ${props =>
      props.isIncluded
        ? theme('colors.green.secondary')
        : theme('colors.purple.bright')};
`

interface IProps {
  isExpanded: boolean
  index: number
  isIncluded: boolean
}

export const NextStepRoute = observer(
  ({ isExpanded, index, isIncluded }: IProps): ReactElement => {
    const [allVariants, transcribedVariants] = get(
      datasetStore,
      'statAmount',
      [],
    )

    const currentStep = dtreeStore.getStepData[index]
    const startFilterCounts = currentStep.startFilterCounts

    const changedStartCounts = startFilterCounts
      ? formatNumber(startFilterCounts)
      : startFilterCounts

    const changedAllVariants = allVariants
      ? formatNumber(allVariants)
      : allVariants

    const alternativeCounts = changedStartCounts || changedAllVariants

    const firstStepValue = transcribedVariants
      ? changedStartCounts
      : alternativeCounts

    const isDifferenceActive = currentStep.isReturnedVariantsActive
    const shouldTooltipAppear = Boolean(currentStep.difference)

    const tooltipConent = t('dtree.showReturnedVariantsForStep', {
      returnValue: currentStep.excluded ? 'excluded' : 'included',
      index: index + 1,
    })

    const differenceWithCommas = formatNumber(currentStep.difference)

    const defaultStartCounts =
      index === 0 ? firstStepValue : formatNumber(startFilterCounts)

    const isFinalStep = index === dtreeStore.stepData.length - 1

    const currentStartCounts = isFinalStep
      ? differenceWithCommas
      : defaultStartCounts

    return (
      <div style={{ minHeight: 53 }} className="relative flex h-full w-full">
        <StartAmount className="w-5/6 flex flex-col justify-between items-end mt-2 text-blue-bright mr-1 pt-1">
          <div>{currentStartCounts}</div>
        </StartAmount>

        <div className="flex flex-col items-center w-1/6">
          <CircleStartThread className="bg-blue-bright">
            <SubCircleThread />
          </CircleStartThread>

          <LineThread
            className={cn('bg-blue-bright', { 'mt-4': index === 0 })}
          />

          {isExpanded && currentStep.groups && currentStep.groups.length > 0 && (
            <Fragment>
              <ExcludeTurn isIncluded={isIncluded}>
                <div
                  className="absolute w-full right-4 flex justify-end items-center"
                  style={{ top: 48 }}
                >
                  <Tooltip
                    overlay={tooltipConent}
                    trigger={shouldTooltipAppear ? ['hover'] : []}
                  >
                    <ExcludeAmount
                      isIncluded={isIncluded}
                      onClick={() =>
                        activeStepStore.makeStepActive(
                          index,
                          ActiveStepOptions.ReturnedVariants,
                        )
                      }
                      data-testid={DecisionTreesResultsDataCy.excludeInfo}
                    >
                      <span>
                        {isIncluded ? '+' : '-'}
                        {isDifferenceActive ? (
                          <DifferenceCounts isIncluded={isIncluded}>
                            {differenceWithCommas}
                          </DifferenceCounts>
                        ) : (
                          <span>{differenceWithCommas}</span>
                        )}
                      </span>
                    </ExcludeAmount>
                  </Tooltip>

                  <div className="ml-1">
                    {isIncluded ? (
                      <Icon
                        name="ThreadAdd"
                        className="transform rotate-45 text-green-secondary"
                      />
                    ) : (
                      <Icon name="ThreadClose" className="text-purple-bright" />
                    )}
                  </div>
                </div>
              </ExcludeTurn>
            </Fragment>
          )}
        </div>
      </div>
    )
  },
)
