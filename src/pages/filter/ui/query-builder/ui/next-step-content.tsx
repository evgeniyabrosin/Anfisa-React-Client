import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/active-step.store'
import dtreeModalStore from '../../../modals.store'
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

export const NextStepContent = observer(({ index }: IProps): ReactElement => {
  const groups = dtreeStore.getStepData[index].groups

  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const expandGroup = (id: number) => () => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const currentStepData = dtreeStore.getStepData[index]
  const isExcluded = currentStepData.excluded
  const result = String(!isExcluded)

  const condition = currentStepData.condition ?? null

  const getWords = (text: string | null) => {
    if (!text) return []

    const splitByBraces = text.split('{').map((item, index) => {
      if (index === 0) return [`${item}{`]

      const elements = item.split('}').map((x, i) => {
        if (i === 1) return `}${x}`
        if (expanded[index - 1]) return x
        const attachments = x.split(',')
        if (attachments.length <= 3) return attachments.join(',')
        return attachments.slice(0, 3).join(',') + ', ...'
      })

      return elements.join('')
    })

    const res = splitByBraces.join('')
    const textList = res.split(/{|}/)
    const changedTextList = textList.map(element => {
      if (element.includes('"')) return `{${element}}`

      return element.split(' ')
    })

    const flatedTextList = changedTextList.flat()

    const words = flatedTextList
      .filter(Boolean)
      .map((word, wordIndex: number) => {
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
    activeStepStore.makeStepActive(index, ActiveStepOptions.StartedVariants)

    dtreeModalStore.openModalAttribute()
  }

  return (
    <div className="flex flex-col items-start py-2 h-auto w-full">
      <Content>
        <div className="flex flex-col w-2/3 h-auto justify-between step-content-area">
          {/* TODO: add variable "isEmptyStep" instead of "groups && groups.length > 0" */}
          {groups && groups.length > 0 ? (
            groups.map((group: any, currNo: number) => (
              <NextStepContentItem
                key={JSON.stringify(group) + currNo}
                group={group}
                index={index}
                currNo={currNo}
                setExpandOnClick={expandGroup(currNo)}
                expanded={expanded[currNo] || false}
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
            <div
              className="bg-blue-secondary w-full h-auto rounded-md text-12 p-2 font-normal font-mono"
              data-testid={DecisionTreesResultsDataCy.contentEditor}
            >
              {dtreeStore.stepData[index].comment && (
                <div className="text-white mb-2">
                  {dtreeStore.stepData[index].comment}
                </div>
              )}

              <div className="flex">
                <div className="text-orange-secondary mr-2">{wordList}</div>
              </div>

              <div className="text-grey-light pl-2">return {result}</div>
            </div>
          </ContentEditor>
        )}
      </Content>

      <div
        data-testid={DecisionTreesResultsDataCy.addAttrbute}
        className="text-14 text-blue-bright font-normal pt-1 cursor-pointer hover:text-blue-dark"
        onClick={openModal}
      >
        {t('dtree.addAttribute')}
      </div>
    </div>
  )
})
