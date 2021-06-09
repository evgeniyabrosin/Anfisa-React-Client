import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import { CloseTagSvg } from '@icons/close-tag'

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
          <CloseTagSvg
            onClick={() => isActive && datasetStore.removeTag(text)}
          />
        )}
      </div>
    )
  },
)
