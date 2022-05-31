import styles from './input-search.module.css'

import { ChangeEvent, memo, ReactElement, useCallback } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '../data-testid/decision-tree-results.cy'

interface IInputSearchProps {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  big?: boolean
  canClearInput?: boolean
}

// eslint-disable-next-line react/display-name
export const InputSearch = memo(
  ({ ...rest }: IInputSearchProps): ReactElement => {
    const { className, big = false, canClearInput = true, ...tempRest } = rest

    const onClickClearButton = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        event.target.value = ''
        tempRest.onChange(event)
      },
      [tempRest],
    )

    return (
      <div className={cn('relative', className)}>
        <input
          type="text"
          data-testid={DecisionTreesResultsDataCy.searchGraphResults}
          className={cn(styles.inputSearch, big && styles.inputSearch_big)}
          {...tempRest}
        />

        <div className={cn('absolute right-2 flex', big ? 'top-2' : 'top-1.5')}>
          {canClearInput && tempRest.value && (
            <Icon
              name="CloseMD"
              onClick={onClickClearButton}
              className={cn('text-grey-blue mr-2 cursor-pointer')}
            />
          )}
          <Icon name="Loupe" className={cn('text-grey-blue ')} />
        </div>
      </div>
    )
  },
)
