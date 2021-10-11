import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FilterCountsType } from '@declarations'
import { theme } from '@theme'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'

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

const CircleEndThread = styled.div`
  position: absolute;
  bottom: -1px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
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

interface IProps {
  isExpanded: boolean
  index: number
  length: number
  isIncluded: boolean
}

function getNumberWithCommas(value: FilterCountsType) {
  if (typeof value !== 'number') return '...'

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const NextStepRoute = observer(
  ({ isExpanded, index, length, isIncluded }: IProps): ReactElement => {
    const [allVariants, transcribedVariants] = get(
      datasetStore,
      'statAmount',
      [],
    )

    const startFilterCounts = dtreeStore.stepData[index].startFilterCounts
    const finishFilterCounts = dtreeStore.stepData[index].finishFilterCounts
    const currentStep = dtreeStore.stepData[index]

    const changedStartCounts = startFilterCounts
      ? getNumberWithCommas(startFilterCounts)
      : startFilterCounts

    const changedAllVariants = allVariants
      ? getNumberWithCommas(allVariants)
      : allVariants

    const alternativeCounts = changedStartCounts || changedAllVariants

    const firstStepValue = transcribedVariants
      ? changedStartCounts
      : alternativeCounts

    const showStatistics = () => {
      const code = dtreeStore.dtreeCode
      const indexForApi = dtreeStore.getStepIndexForApi(index) + 1

      dtreeStore.setStepActive(index)
      dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
    }

    return (
      <div style={{ minHeight: 53 }} className="relative flex h-full w-full">
        <StartAmount className="w-5/6 flex flex-col justify-between items-end mt-2 text-blue-bright mr-1 pt-1">
          <div>
            {index === 0
              ? firstStepValue
              : getNumberWithCommas(startFilterCounts)}
          </div>

          {length - index < 2 && (
            <div style={{ marginBottom: -3 }}>
              {(finishFilterCounts &&
                finishFilterCounts > 0 &&
                getNumberWithCommas(finishFilterCounts)) ||
                (transcribedVariants &&
                  getNumberWithCommas(transcribedVariants))}
            </div>
          )}
        </StartAmount>

        <div className="flex flex-col items-center w-1/6">
          <CircleStartThread className="bg-blue-bright">
            <SubCircleThread />
          </CircleStartThread>

          <LineThread
            className={cn('bg-blue-bright', { 'mt-4': index === 0 })}
          />

          {isExpanded && currentStep.groups && (
            <Fragment>
              <ExcludeTurn isIncluded={isIncluded}>
                <div
                  className="absolute w-full right-4 flex justify-end items-center"
                  style={{ top: 48 }}
                >
                  <ExcludeAmount
                    isIncluded={isIncluded}
                    onClick={showStatistics}
                  >
                    {isIncluded
                      ? `+${currentStep.difference}`
                      : `-${currentStep.difference}`}
                  </ExcludeAmount>

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

          <Fragment>
            {length - index < 2 && (
              <CircleEndThread className="bg-blue-bright">
                <SubCircleThread />
              </CircleEndThread>
            )}
          </Fragment>
        </div>
      </div>
    )
  },
)
