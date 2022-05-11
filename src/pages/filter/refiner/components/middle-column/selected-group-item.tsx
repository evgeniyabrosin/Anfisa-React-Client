import React, { ReactElement } from 'react'

import { Checkbox } from '@ui/checkbox/checkbox'
import { TVariant } from '@service-providers/common'

interface ISelectedGroupItemProps {
  handleCheckGroupItem: (checked: boolean, variant: TVariant) => void
  variant: TVariant
  isSelected: boolean
}

export const SelectedGroupItem = ({
  isSelected,
  variant,
  handleCheckGroupItem,
}: ISelectedGroupItemProps): ReactElement => {
  const handleCheck = (event: any) => {
    handleCheckGroupItem(event.target.checked, variant)
  }

  const [variantName, variantValue] = variant

  return (
    <Checkbox
      id={variantName + variantValue}
      checked={isSelected}
      onChange={handleCheck}
      className="mb-4 text-14 flex items-center h-4 w-fit"
    >
      <span>{variantName}</span>

      <span className="text-grey-blue ml-2">({variantValue})</span>
    </Checkbox>
  )
}
