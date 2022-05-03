import styles from './input-search.module.css'

import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'
import { DecisionTreesResultsDataCy } from '../data-testid/decision-tree-results.cy'

interface Props {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  big?: boolean
}

export const InputSearch = ({ ...rest }: Props): ReactElement => {
  const { className, big = false, ...tempRest } = rest

  return (
    <div className={cn('relative', className)}>
      <input
        type="text"
        data-testid={DecisionTreesResultsDataCy.searchGraphResults}
        className={!big ? styles.inputSearch : styles.inputSearchBig}
        {...tempRest}
      />

      <Icon
        name="Loupe"
        className={cn(
          'text-grey-blue absolute right-2',
          big ? 'top-2' : 'top-1.5',
        )}
      />
    </div>
  )
}
