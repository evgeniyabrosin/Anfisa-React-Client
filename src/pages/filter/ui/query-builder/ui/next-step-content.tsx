import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { makeStepActive } from '@utils/makeStepActive'
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
    const groups = dtreeStore.getStepData[index].groups

    const currentStepData = dtreeStore.getStepData[index]
    const isExcluded = currentStepData.excluded
    const result = String(!isExcluded)

    const condition = currentStepData.condition ?? null

    const getWords = (text: string | null) => {
      if (!text) return []

      const textList = text.split(/{|}/)

      const changedTextList = textList.map(element => {
        if (element.includes(`"`)) return `{${element}}`

        return element.split(' ')
      })

      const flatedTextList = changedTextList.flat()

      const words = flatedTextList.map((word, wordIndex: number) => {
        const changedWord = word.trim()

        switch (changedWord) {
          case 'if':
          case 'and':
          case 'or':
          case 'not':
            return (
              <span key={wordIndex} className="text-white">{` ${word} `}</span>
            )

          default:
            return <span key={wordIndex}>{`${word} `}</span>
        }
      })

      return words
    }

    const wordList = getWords(condition)

    const openModal = () => {
      makeStepActive(index)
      dtreeStore.openModalAttribute(index)
    }

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
                  <div className="text-orange-secondary mr-2">
                    {wordList.map(element => element)}
                  </div>
                </div>

                <div className="text-grey-light pl-2">return {result}</div>
              </div>
            </ContentEditor>
          )}
        </Content>

        <div
          className="text-14 text-blue-bright font-normal pt-1 cursor-pointer hover:text-blue-dark"
          onClick={openModal}
        >
          {t('dtree.addAttribute')}
        </div>
      </div>
    )
  },
)
