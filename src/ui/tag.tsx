import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import { Icon } from '@ui/icon'

interface Props {
  text: string
  isActive?: boolean
}

export const Tag = observer(
  ({ text, isActive }: Props): ReactElement => {
    return (
      <div
        className={cn([
          'rounded-full',
          'py-1',
          'px-2',
          'flex',
          'justify-between',
          'items-center',
          'm-1',
          isActive ? 'bg-blue-bright' : 'bg-blue-light',
        ])}
        onClick={() => !isActive && datasetStore.addTag(text)}
      >
        <span
          className={cn([
            'text-12',
            'cursor-pointer',
            'leading-1',
            isActive ? 'text-white' : 'text-blue-1',
          ])}
        >
          {text}
        </span>

        {isActive && (
          <Icon
            name="CloseTag"
            className="ml-1 cursor-pointer opacity-60"
            onClick={() => isActive && datasetStore.removeTag(text)}
          />
        )}
      </div>
    )
  },
)
