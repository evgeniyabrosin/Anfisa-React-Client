import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { StepTypeEnum } from '@core/enum/step-type-enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { getExpression } from '@utils/getExpression'
import { DropDownJoin } from './dropdown-join'
import { ExpandContentButton } from './expand-content-button'

const ContentControl = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`

const JoinType = styled.div`
  width: 34px;
  height: 28px;
`

interface IProps {
  group: any
  index: number
  currNo: number
}

export const NextStepContentItem = observer(
  ({ group, index, currNo }: IProps): ReactElement => {
    const [isChecked, setIsChecked] = useState(true)

    const toggleChecked = () => {
      setIsChecked(prev => !prev)
    }

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisible = () => {
      setIsVisible(prev => !prev)
    }

    const currentStep = dtreeStore.stepData[index]

    const handleModals = () => {
      group[0] === StepTypeEnum.Enum &&
        dtreeStore.openModalEditFilters(group[1], index, currNo)

      group[0] === StepTypeEnum.Numeric &&
        dtreeStore.openModalEditNumbers(group[1], index, currNo)

      if (group[0] === StepTypeEnum.Func) {
        group[1] === FuncStepTypesEnum.InheritanceMode &&
          dtreeStore.openModalEditInheritanceModeFunc(group[1], index, currNo)

        group[1] === FuncStepTypesEnum.CustomInheritanceMode &&
          dtreeStore.openModalEditCustomInheritanceModeFunc(
            group[1],
            index,
            currNo,
          )

        group[1] === FuncStepTypesEnum.CompoundHet &&
          alert('This function is not ready yet')

        group[1] === FuncStepTypesEnum.CompoundRequest &&
          alert('This function is not ready yet')

        group[1] === FuncStepTypesEnum.GeneRegion &&
          alert('This function is not ready yet')
      }
    }

    return (
      <div className="flex flex-col h-auto">
        {currNo > 0 && (
          <div
            className={cn(
              'flex w-full h-2/5 py-2 text-14 font-normal items-center relative',
              currentStep.isActive ? 'bg-green-light' : 'bg-blue-light',
            )}
          >
            <div className="mr-1">{t('dtree.joinBy')}</div>
            <JoinType className="flex items-center justify-center bg-orange-light text-orange-bright">
              {group.includes('or') && 'OR'}
              {group.includes('and') && 'AND'}
            </JoinType>

            <ExpandContentButton
              isDropDown
              isVisible={isVisible}
              expandContent={toggleVisible}
            />

            {isVisible && (
              <DropDownJoin
                close={() => setIsVisible(false)}
                index={index}
                currNo={currNo}
              />
            )}
          </div>
        )}

        <ContentControl
          className={cn(
            'w-full h-auto flex rounded-md mr-2 pl-2 py-3',
            currentStep.isActive ? ' bg-green-medium' : 'bg-blue-medium',
          )}
        >
          <div className="flex items-center h-auto w-full pr-2">
            <Icon
              name="SettingsFat"
              className="mr-1 cursor-pointer text-blue-bright"
              size={18}
              stroke={false}
              onClick={handleModals}
            />

            <div className="flex items-center text-14 font-medium mr-2">
              {group.includes(StepTypeEnum.Func) && (
                <div
                  style={{ width: 18, height: 18 }}
                  className={cn(
                    'flex items-center justify-center mr-1 text-12 shadow-dark rounded-sm font-mono',
                    {
                      'text-green-secondary bg-green-light': !currentStep.isActive,
                      'text-blue-bright bg-blue-medium': currentStep.isActive,
                    },
                  )}
                >
                  {t('dtree.fn')}
                </div>
              )}
              {`${group[1]}`}
            </div>

            <div className="pt-1.5">
              <Switch isChecked={isChecked} onChange={toggleChecked} />
            </div>
          </div>

          <div className="flex flex-col text-14 font-normal h-full flex-wrap mt-1">
            {group[0] === StepTypeEnum.Numeric &&
              getExpression(
                group.find((elem: any) => Array.isArray(elem)),
                group[1],
              )}

            {group[0] !== StepTypeEnum.Numeric &&
              group
                .find((elem: any) => Array.isArray(elem))
                .map((item: any[]) => <div key={Math.random()}>{item}</div>)}
          </div>
        </ContentControl>
      </div>
    )
  },
)
