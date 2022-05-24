import React, { ChangeEvent, FC, MouseEvent } from 'react'
import cn, { Argument } from 'classnames'

import filterStore from '@store/filter'
import { Select } from '@ui/select'
import { selectOptions } from '@pages/filter/dtree/components/modals/modals-control-store'
import compoundRequestStore from '@pages/filter/refiner/components/middle-column/panels/function-panel/components/compound-request/compound-request.store'

interface IProblemGroupProp {
  group: string
  value: string
  currNo: number
  index: number
  className?: Argument
}

export const ProblemGroup: FC<IProblemGroupProp> = ({
  group,
  value,
  currNo,
  index,
  className,
}) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (value !== e.target.value) {
      filterStore.setTouched(true)
    }

    compoundRequestStore.handleSetSingleRequest(index, currNo, e.target)
  }

  const setActive = () => compoundRequestStore.handleActiveRequest(index)

  return (
    <div
      className={cn('step-content-area flex items-center', className)}
      key={group}
      onClick={setActive}
    >
      <span className="cursor-pointer step-content-area">{group}</span>

      <Select
        onClick={(e: MouseEvent<any>) => e.stopPropagation()}
        onChange={handleSelect}
        className="w-auto ml-1 py-1 px-2 bg-white"
        options={selectOptions}
        value={value}
      />
    </div>
  )
}
