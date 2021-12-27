import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { IVariantList } from '@declarations'
import filterStore from '@store/filter'

interface IProps {
  subattributeList: any[]
  handleSelect: (index: number, checked: boolean) => void
}

export const SelectedGroupItems = observer(
  ({ subattributeList, handleSelect }: IProps): ReactElement => {
    return (
      <div className="mt-4">
        {subattributeList?.map((element: IVariantList, index: number) => {
          const { variant, isChecked } = element
          const name = variant[0]
          const amount = variant[1]

          return (
            <div
              key={name}
              className="flex items-center mb-3 text-14 leading-16px"
            >
              <Checkbox
                checked={isChecked}
                style={{ cursor: 'pointer' }}
                indeterminate={filterStore.selectedGroupItem.name === name}
                onChange={event => {
                  handleSelect(index, event.target.checked)
                }}
              />

              <span className="font-medium ml-2">{name}</span>

              {amount !== 0 && (
                <span className="ml-1 text-grey-blue">{`(${amount})`}</span>
              )}
            </div>
          )
        })}
      </div>
    )
  },
)
