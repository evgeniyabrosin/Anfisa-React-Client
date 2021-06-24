import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { Icon } from '@ui/icon'

interface Props {
  text: string
  isActive?: boolean
  hideCloseIcon?: boolean
  onClick?: (tagName: string) => void
  onRemove?: (tagName: string) => void
}

export const Tag = observer(
  ({
    text,
    isActive,
    hideCloseIcon,
    onClick,
    onRemove,
  }: Props): ReactElement => (
    <div
      className={cn([
        'rounded-full',
        'py-0.5',
        'px-2',
        'flex',
        'justify-between',
        'items-center',
        'my-0.5 mr-1',
        isActive ? 'bg-blue-bright' : 'bg-blue-light',
      ])}
      onClick={() => !isActive && onClick && onClick(text)}
    >
      <span
        className={cn([
          'text-12',
          'cursor-pointer',
          'leading-14px',
          'truncate',
          isActive ? 'text-white' : 'text-blue-bright',
        ])}
      >
        {text}
      </span>

      {isActive && !hideCloseIcon && (
        <Icon
          name="CloseTag"
          className="ml-1 cursor-pointer"
          onClick={() => isActive && onRemove && onRemove(text)}
        />
      )}
    </div>
  ),
)
