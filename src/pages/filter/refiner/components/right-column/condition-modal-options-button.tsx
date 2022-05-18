import { ReactElement } from 'react'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

interface IProps {
  refEl: HTMLElement
  onClick?: () => void
}

export const ConditionModalOptionsButton = ({
  refEl,
  ...rest
}: IProps): ReactElement => {
  return (
    <Button
      refEl={refEl}
      onClick={rest.onClick}
      className="bg-transparent hover:bg-transparent  active:bg-transparent"
      append={
        <Icon
          name="Options"
          className="cursor-pointer text-blue-bright"
          stroke={false}
        />
      }
    />
  )
}
