import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

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
    ${props => (props.isIncluded ? '#19af00' : '#aa23fb')};
  border-right: 6.5px solid
    ${props => (props.isIncluded ? '#19af00' : '#aa23fb')};
  border-bottom-right-radius: 20px;
`

const ExcludeAmount = styled.div<{ isIncluded: boolean }>`
  width: auto;
  font-size: 13px;
  font-weight: 700;
  color: ${props => (props.isIncluded ? '#19af00' : '#aa23fb')};
`

type Props = {
  isExpanded: boolean
  index: number
  length: number
  isIncluded: boolean
}

function getNumberWithCommas(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const NextStepRoute = observer(
  ({ isExpanded, index, length, isIncluded }: Props): ReactElement => {
    const [allVariants, transcribedVariants] = get(
      datasetStore,
      'statAmount',
      [],
    )

    const startFilterCounts = dtreeStore.stepData[index].startFilterCounts
    const finishFilterCounts = dtreeStore.stepData[index].finishFilterCounts
    const currentStep = dtreeStore.stepData[index]

    return (
      <div style={{ minHeight: 53 }} className="flex h-full w-full relative">
        <StartAmount className="w-5/6 flex flex-col justify-between items-end mt-2 text-blue-bright mr-1 pt-1">
          <div>
            {index === 0
              ? transcribedVariants && getNumberWithCommas(transcribedVariants)
              : getNumberWithCommas(startFilterCounts)}
          </div>

          {length - index < 2 && (
            <div style={{ marginBottom: -3 }}>
              {(finishFilterCounts &&
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
              <ExcludeTurn isIncluded={isIncluded} />

              <div
                className="absolute w-full flex justify-end items-center mr-24 pr-4"
                style={{ top: 77 }}
              >
                <ExcludeAmount isIncluded={isIncluded}>
                  {isIncluded
                    ? `+${currentStep.difference}`
                    : `-${currentStep.difference}`}
                </ExcludeAmount>

                <div className="ml-1">
                  {isIncluded ? (
                    <Icon name="ThreadAdd" className="transform rotate-45" />
                  ) : (
                    <Icon name="ThreadClose" />
                  )}
                </div>
              </div>
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
