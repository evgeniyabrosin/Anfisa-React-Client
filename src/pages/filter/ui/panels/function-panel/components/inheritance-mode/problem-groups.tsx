import React, { ChangeEvent } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

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
  }: IProblemGroupsProps) => {
    return (
      <React.Fragment>
        <div className="flex items-center justify-between">
          <span className="text-14 leading-16px font-bold text-grey-blue mt-4">
            Problem group
          </span>

          <span
            className="text-12 text-blue-bright leading-14px cursor-pointer"
            onClick={inheritanceModeStore.resetAllFields}
          >
            Reset
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          {problemGroups.map(problemGroup => (
            <div key={problemGroup} className="flex items-center">
              <Checkbox
                checked={problemGroupValues.includes(problemGroup)}
                onChange={e => handleChangeProblemGroups(e, problemGroup)}
              />
              <span className="text-14 leading-16px ml-2">{problemGroup}</span>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  },
)
