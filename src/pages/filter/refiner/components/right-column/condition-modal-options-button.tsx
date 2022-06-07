import { ReactElement, RefObject } from 'react'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

interface IConditionModalOptionsButtonProps {
  refEl: RefObject<HTMLButtonElement>
  onClick?: () => void
}

export const ConditionModalOptionsButton = ({
  refEl,
  ...rest
}: IConditionModalOptionsButtonProps): ReactElement => {
  return (
    <Button
      refEl={refEl}
      onClick={rest.onClick}
      variant="text"
      icon={
        <Icon
          name="Options"
          className="cursor-pointer text-blue-bright"
          stroke={false}
        />
      }
    />
  )
}
