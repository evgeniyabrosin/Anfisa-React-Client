import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import activeStepStore, {
  ActiveStepOptions,
} from '@pages/filter/dtree/components/active-step.store'
import modalsVisibilityStore from '../../../modals/modals-visibility-store'
import { ContentCode } from './content-code/content-code'
import { NextStepContentItem } from './next-step-content-item'
interface INextStepContentProps {
  index: number
  stepNo: number
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`

export const NextStepContent = observer(
  ({ index, stepNo }: INextStepContentProps): ReactElement => {
    const groups = dtreeStore.filteredStepData[index].groups

    const [expanded, setExpanded] = useState<Record<number, boolean>>({})
    const expandGroup = (id: number) => () => {
      setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const currentStepData = dtreeStore.filteredStepData[index]

    const codeCondition = currentStepData.condition || ''
    const codeResult = currentStepData.result || ''

    const openModal = () => {
      activeStepStore.makeStepActive(
        stepNo - 1,
        ActiveStepOptions.StartedVariants,
      )

      modalsVisibilityStore.openModalAttribute()
    }

    return (
      <div className="flex flex-col items-start py-2 h-auto w-full">
        <Content>
          <div className="flex flex-col w-2/3 h-auto justify-between step-content-area">
            {/* TODO: add variable "isEmptyStep" instead of "groups && groups.length > 0" */}
            {groups && groups.length > 0 ? (
              groups.map((group: any, groupNo: number) => (
                <NextStepContentItem
                  key={JSON.stringify(group) + groupNo}
                  group={group}
                  stepNo={stepNo}
                  index={index}
                  groupNo={groupNo}
                  setExpandOnClick={expandGroup(groupNo)}
                  expanded={expanded[groupNo] || false}
                />
              ))
            ) : (
              <div className="text-14 text-grey-blue font-normal step-content-area">
                {t('dtree.nothingSelected')}
              </div>
            )}
          </div>

          {groups && groups.length > 0 && (
            <ContentCode
              codeCondition={codeCondition}
              codeResult={codeResult}
            />
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
  },
)
