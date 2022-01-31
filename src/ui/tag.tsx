import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { Icon } from '@ui/icon'
import { VariantDrawerDataCy } from '@components/data-testid/variant-drawer.cy'

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
      data-testid={VariantDrawerDataCy.addedTag}
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
      onClick={() => onClick && onClick(text)}
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
          name="ClosePadded"
          className="ml-1 cursor-pointer opacity-60"
          onClick={() => onRemove && onRemove(text)}
        />
      )}
    </div>
  ),
)
