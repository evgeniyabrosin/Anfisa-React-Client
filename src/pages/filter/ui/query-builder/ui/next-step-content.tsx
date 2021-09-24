import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { NextStepContentItem } from './next-step-content-item'

interface IProps {
  index: number
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`

const ContentEditor = styled.div`
  display: flex;
  height: auto;
`

export const NextStepContent = observer(
  ({ index }: IProps): ReactElement => {
    const groups = dtreeStore.stepData[index].groups

    const currentStepData = dtreeStore.stepData[index]
    const isExcluded = currentStepData.excluded
    const result = String(!isExcluded)

    return (
      <div className="flex flex-col items-start py-2 h-auto w-full">
        <Content>
          <div className="flex flex-col w-2/3 h-auto justify-between step-content-area">
            {groups && groups.length > 0 ? (
              groups.map((group: any, currNo: number) => (
                <NextStepContentItem
                  key={JSON.stringify(group) + currNo}
                  group={group}
                  index={index}
                  currNo={currNo}
                />
              ))
            ) : (
              <div className="text-14 text-grey-blue font-normal step-content-area">
                {t('dtree.nothingSelected')}
              </div>
            )}
          </div>

          {groups && groups.length > 0 && (
            <ContentEditor className="w-1/3 h-full">
              <div className="bg-blue-secondary w-full h-auto rounded-md text-12 p-2 font-normal font-mono">
                {dtreeStore.stepData[index].comment && (
                  <div className="text-white mb-2">
                    {dtreeStore.stepData[index].comment}
                  </div>
                )}

                <div className="flex">
                  <div className="text-grey-light mr-2">If</div>

                  {/*TODO: to display func attr content, use getFuncParams util */}

                  <div className="flex flex-wrap text-orange-secondary">
                    {dtreeStore.stepData[index].groups[0][1]} in &#123;{' '}
                    {dtreeStore.stepData[index].groups[0][1]} &#125;
                  </div>
                </div>

                <div className="text-grey-light pl-2">return {result}</div>
              </div>
            </ContentEditor>
          )}
        </Content>

        <div
          className="text-14 text-blue-bright font-normal pt-1 cursor-pointer hover:text-blue-dark"
          onClick={() => dtreeStore.openModalAttribute(index)}
        >
          {t('dtree.addAttribute')}
        </div>
      </div>
    )
  },
)
