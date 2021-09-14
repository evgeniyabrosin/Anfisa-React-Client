import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { type } from 'os'
import styled from 'styled-components'

import { StepTypeEnum } from '@core/enum/step-type-enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import dtree from '@store/dtree'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { getGreaterLessSign } from '../../../../../utils/getGreaterLessSign'
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

type Props = {
  group: any
  index: number
  currNo: number
}

export const NextStepContentItem = observer(
  ({ group, index, currNo }: Props): ReactElement => {
    const [isChecked, setIsChecked] = useState(true)

    const toggleChecked = () => {
      setIsChecked(prev => !prev)
    }

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisible = () => {
      setIsVisible(prev => !prev)
    }

    const currentGroup = dtreeStore.stepData[index].groups[currNo]
    const currentStep = dtreeStore.stepData[index]

    const handleModals = () => {
      currentGroup[0] === StepTypeEnum.Enum &&
        dtreeStore.openModalEditFilters(group[1], index, currNo)
      currentGroup[0] === StepTypeEnum.Numeric && dtree.openModalSelectNumbers()
      currentGroup[0] === StepTypeEnum.Func &&
        alert('This function is not ready yet')
    }

    const getNumber = (data: any) => {
      let number = 0

      data.map((item: any) => {
        if (typeof item === 'number') number = item
      })

      return number
    }

    const getStringFromProperty = (data: any) => {
      const string =
        Object.keys(data).length > 0
          ? `${Object.keys(data)[0]} = ${Object.values(data)[0]}`
          : ``

      return string
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
              {currentGroup.includes('or') && 'OR'}
              {currentGroup.includes('and') && 'AND'}
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
            'w-full h-auto flex rounded-md mr-2 pl-2 py-2',
            currentStep.isActive ? ' bg-green-medium' : 'bg-blue-medium',
          )}
        >
          <div className="flex items-center h-1/2 w-full">
            <Icon
              name="SettingsFat"
              className="mr-2 -mt-px cursor-pointer"
              size={18}
              stroke={false}
              onClick={handleModals}
            />

            <div className="text-14 font-medium mr-2">
              {`${group[1]}`}
              {group.includes(StepTypeEnum.Func) &&
                `(${getStringFromProperty(group[group.length - 1])})`}
            </div>

            <div className="mt-1">
              <Switch isChecked={isChecked} onChange={toggleChecked} />
            </div>
          </div>
          {group.includes(StepTypeEnum.Enum) && (
            <div className="flex flex-col text-14 font-normal h-full flex-wrap">
              {group[group.length - 1].map((item: any[]) => (
                <div key={Math.random()}>{item}</div>
              ))}
            </div>
          )}
          {group.includes(StepTypeEnum.Numeric) && (
            <div className="flex text-14 font-normal h-full flex-wrap">
              <div key={Math.random()}>
                {getGreaterLessSign(group[group.length - 1])}{' '}
                {getNumber(group[group.length - 1])}
              </div>
            </div>
          )}
          {group.includes(StepTypeEnum.Func) && (
            <div className="flex text-14 font-normal h-full flex-wrap">
              {group[group.length - 2].map((item: any[]) => (
                <div key={Math.random()}>{item}</div>
              ))}
            </div>
          )}
        </ContentControl>
      </div>
    )
  },
)
