import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'

interface Props {
  name: string
  amount: number
  handleSelect: (checked: boolean) => void
}

export const SelectedGroupItem = observer(
  ({ name, amount, handleSelect }: Props): ReactElement => {
    const checked = get(
      filterStore,
      `selectedFilters[${filterStore.selectedGroupItem.vgroup}][${filterStore.selectedGroupItem.name}][${name}]`,
    )

    return (
      <div className="flex items-center mb-3 text-14  leading-16px">
        <Checkbox
          checked={Number.isInteger(checked)}
          style={{ cursor: 'pointer' }}
          indeterminate={filterStore.selectedGroupItem.name === name}
          onChange={event => {
            handleSelect(event.target.checked)
          }}
        />

        <span key={name} className="font-medium ml-2">
          {name}
        </span>

        {amount !== 0 && (
          <span className="ml-1 text-grey-blue">{`(${amount})`}</span>
        )}
      </div>
    )
  },
)
