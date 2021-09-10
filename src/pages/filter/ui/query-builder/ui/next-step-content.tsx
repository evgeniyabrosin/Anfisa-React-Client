import { ReactElement } from 'react'
// import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { NextStepContentItem } from './next-step-content-item'

type Props = {
  index: number
}

const Container = styled.div`
  height: auto;
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: start;
  padding-top: 8px;
  padding-bottom: 8px;
`

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
  ({ index }: Props): ReactElement => {
    const groups = dtreeStore.stepData[index].groups

    return (
      <Container>
        <Content>
          <div className="flex flex-col w-2/3 h-auto justify-between">
            {groups && groups.length > 0 ? (
              groups.map((group: any, currNo: number) => (
                <NextStepContentItem
                  key={Math.random()}
                  group={group}
                  index={index}
                  currNo={currNo}
                />
              ))
            ) : (
              <div className="text-14 text-grey-blue font-normal">
                {t('dtree.nothingSelected')}
              </div>
            )}
          </div>

          {groups && groups.length > 0 && (
            <ContentEditor className="w-1/3 h-full">
              <div className="bg-blue-secondary w-full h-auto rounded-md text-12 font-normal font-mono">
                {/* <div className="flex p-2">
                  <div className="text-grey-light mr-2">If</div>

                  <div className="flex flex-wrap text-orange-secondary">
                    {dtreeStore.stepData[index].groups[0][0]} in &#123;{' '}
                    {dtreeStore.stepData[index].groups[0][1]} &#125;
                  </div>
                </div>

                <div className="text-grey-light pl-2">return false</div> */}
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
      </Container>
    )
  },
)
