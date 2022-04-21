import React, { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'

import { TVariant } from '@service-providers/common'

interface IProps {
  handleCheckGroupItem: (checked: boolean, variant: TVariant) => void
  variant: TVariant
  isSelected: boolean
}

export const SelectedGroupItem = ({
  isSelected,
  variant,
  handleCheckGroupItem,
}: IProps): ReactElement => {
  const handleCheck = (event: any) => {
    handleCheckGroupItem(event.target.checked, variant)
  }

  return (
    <div className="flex items-center mb-2 text-14">
      <Checkbox
        checked={isSelected}
        className="-mt-0.5 mr-1 cursor-pointer"
        onChange={handleCheck}
      />

      <span className="text-black">{variant[0]}</span>

      <span className="text-grey-blue ml-2">({variant[1]})</span>
    </div>
  )
}
