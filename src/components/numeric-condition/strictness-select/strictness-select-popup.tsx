import React, { ReactElement, useRef } from 'react'
import cn from 'classnames'

import { useOutsideClick } from '@core/hooks/use-outside-click'

export interface IStrictnessSelectPopup {
  className?: string
  isOpen: boolean
  onClose: () => void
  onSelect: (value: boolean) => void
}

export const StrictnessSelectPopup = ({
  className,
  isOpen,
  onClose,
  onSelect,
}: IStrictnessSelectPopup): ReactElement | null => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, onClose)

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 w-full bg-white border border-grey-disabled shadow-input rounded-md overflow-hidden text-center text-blue-bright',
        className,
      )}
    >
      <div
        onClick={() => onSelect(false)}
        className="cursor-pointer hover:bg-blue-tertiary"
      >
        {'<'}
      </div>

      <div
        onClick={() => onSelect(true)}
        className="cursor-pointer hover:bg-blue-tertiary"
      >
        {'≤'}
      </div>
    </div>
  )
}
