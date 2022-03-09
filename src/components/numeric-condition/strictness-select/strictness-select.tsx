import React, { ReactElement, useState } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { StrictnessSelectPopup } from './strictness-select-popup'

export interface IStrictnessSelectProps {
  className?: string
  value: boolean
  onChange: (newValue: boolean) => void
  isDisabled?: boolean
}

export const StrictnessSelect = ({
  className,
  value,
  onChange,
  isDisabled,
}: IStrictnessSelectProps): ReactElement => {
  const [isPopupOpen, setPopupOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center w-12 p-1 shadow-dark rounded',
          isDisabled
            ? 'text-grey-blue'
            : 'cursor-pointer text-black  hover:text-blue-bright',
          isPopupOpen && 'text-blue-bright',
        )}
        onClick={() => setPopupOpen(true)}
      >
        <span
          className={cn(
            'flex items-center justify-center w-3/5 h-full rounded',
            isDisabled
              ? 'bg-grey-light text-grey-blue'
              : 'bg-blue-medium text-blue-bright',
          )}
        >
          {value ? '≤' : '<'}
        </span>
        <span className="flex items-center justify-center pl-1 w-2/5 h-full">
          <Icon
            name="Arrow"
            size={16}
            className={cn('transform rotate-90 transition-transform', {
              'transform -rotate-90': !isPopupOpen,
            })}
          />
        </span>
      </div>
      <StrictnessSelectPopup
        className="mt-1"
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSelect={value => {
          onChange(value)
          setPopupOpen(false)
        }}
      />
    </div>
  )
}
