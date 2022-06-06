import { ChangeEvent, ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox/checkbox'
import { IInheritanceModeProblemGroupsProps } from '../inheritance-mode.interface'

export const InheritanceModeProblemGroups = ({
  problemGroups,
  handleSetProblemGroups,
  selectedPropblemGroups,
  handleReset,
}: IInheritanceModeProblemGroupsProps): ReactElement => (
  <div className="flex items-center justify-between w-full mt-4 text-14">
    <div>{t('dtree.problemGroup')}</div>

    {problemGroups?.map((problemGroup: string) => (
      <Checkbox
        id={problemGroup}
        key={problemGroup}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSetProblemGroups(e.target.checked, problemGroup)
        }
        checked={selectedPropblemGroups.includes(problemGroup)}
        className="ml-1"
      >
        {problemGroup}
      </Checkbox>
    ))}

    <Button
      onClick={handleReset}
      text="Reset"
      variant="secondary"
      className="h-4/5"
    />
  </div>
)
