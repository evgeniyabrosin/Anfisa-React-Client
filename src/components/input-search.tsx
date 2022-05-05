import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'
import { Input } from '@ui/input'
import { DecisionTreesResultsDataCy } from '../../src/components/data-testid/decision-tree-results.cy'

interface IInputSearchProps {
  placeholder?: string
  value: string
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isModal?: boolean
}

export const InputSearch = ({ ...rest }: IInputSearchProps): ReactElement => {
  const { className, ...tempRest } = rest

  return (
    <div className={cn('relative', className)}>
      <Input
        data-testid={DecisionTreesResultsDataCy.searchGraphResults}
        {...tempRest}
      />

      <Icon name="Loupe" className="text-grey-blue absolute top-2 right-2" />
    </div>
  )
}
