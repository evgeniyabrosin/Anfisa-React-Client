import React, { ChangeEvent } from 'react'
import { observer } from 'mobx-react-lite'

import { Checkbox } from '@ui/checkbox/checkbox'
import inheritanceModeStore from './inheritance-mode.store'

interface IProblemGroupsProps {
  problemGroups: string[]
  problemGroupValues: string[]
  handleChangeProblemGroups: (
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ) => void
}

export const ProblemGroups = observer(
  ({
    problemGroups,
    problemGroupValues,
    handleChangeProblemGroups,
  }: IProblemGroupsProps) => (
    <>
      <div className="flex items-center justify-between my-0.5">
        <span className="text-14 leading-16px font-bold text-grey-blue">
          Problem group
        </span>

        <span
          className="text-12 text-blue-bright leading-14px cursor-pointer"
          onClick={inheritanceModeStore.resetAllFields}
        >
          Reset
        </span>
      </div>

      <div className="grid mt-3 mb-2 xl:grid-cols-2 grid-cols-3 gap-4">
        {problemGroups.map(problemGroup => (
          <Checkbox
            id={problemGroup}
            key={problemGroup}
            checked={problemGroupValues.includes(problemGroup)}
            onChange={e => handleChangeProblemGroups(e, problemGroup)}
            className="text-14 leading-4 w-fit"
          >
            {problemGroup}
          </Checkbox>
        ))}
      </div>
    </>
  ),
)
