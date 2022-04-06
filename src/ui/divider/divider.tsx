import { ReactElement } from 'react'
import cn from 'classnames'

interface IDividerProps {
  className?: string
  orientation: 'vertical' | 'horizontal'
}

export const Divider = ({
  className,
  orientation,
}: IDividerProps): ReactElement => {
  return (
    <div
      className={cn(
        'bg-blue-lighter rounded-full overflow-hidden shrink-0 grow-0',
        orientation === 'vertical' ? 'w-0.5 h-full mx-4' : 'h-0.5 w-full my-y',
        className,
      )}
    >
      {'\u00a0'}
    </div>
  )
}
