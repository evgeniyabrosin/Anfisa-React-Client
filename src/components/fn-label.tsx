import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { IStepData } from '@store/dtree'

interface IProps {
  currentStep?: IStepData
  subGroup?: boolean
  className?: Argument
}

export const FnLabel = observer(
  ({ currentStep, subGroup, className }: IProps): ReactElement => {
    return (
      <div
        style={{ width: 18, height: 18 }}
        className={cn(
          'flex items-center justify-center mr-1 text-12 rounded-sm font-mono',
          className,
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
