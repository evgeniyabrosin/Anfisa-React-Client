import { ReactElement } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'

type Props = {
  isVisible: boolean
  isStep?: boolean
  isModal?: boolean
  isDropDown?: boolean
  expandContent?: () => void
}

export const ExpandContentButton = ({
  isVisible,
  isStep,
  isModal,
  isDropDown,
  expandContent,
}: Props): ReactElement => {
  return (
    <div
      className={cn('w-4 h-4', {
        'text-grey-blue': !isVisible,
        'text-white': isVisible && !isStep,
        'text-black': isDropDown,
        'mr-2 text-blue-dark': isModal,
      })}
    >
      <Icon
        name="Arrow"
        onClick={expandContent}
        size={16}
        className={cn(
          'transform rotate-90 cursor-pointer hover:text-blue-bright',
          {
            'transform rotate-90': !isVisible,
            'transform -rotate-90': isVisible,
          },
        )}
      />
    </div>
  )
}
