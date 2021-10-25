import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { IStepData } from '@store/dtree'

interface IProps {
  currentStep?: IStepData
  subGroup?: boolean
}

export const FnLabel = observer(
  ({ currentStep, subGroup }: IProps): ReactElement => {
    return (
      <div
        style={{ width: 18, height: 18 }}
        className={cn(
          'flex items-center justify-center mr-1 text-12 shadow-dark rounded-sm font-mono',
          {
            'text-green-secondary bg-green-light':
              (currentStep && !currentStep.isActive) || subGroup,
            'text-blue-bright bg-blue-medium':
              currentStep && currentStep.isActive,
          },
        )}
      >
        {t('dtree.fn')}
      </div>
    )
  },
)
