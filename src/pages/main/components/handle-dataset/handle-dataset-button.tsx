import { MouseEvent } from 'react'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

interface IHandleDatasetButtonProps {
  refEl: HTMLButtonElement | null
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void
  onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const HandleDatasetButton = ({
  refEl,
  onClick,
  onMouseUp,
}: IHandleDatasetButtonProps) => {
  return (
    <Button
      refEl={refEl}
      onClick={onClick}
      className="rounded"
      size="md"
      icon={<Icon name="Ellipsis" />}
      onMouseUp={onMouseUp}
      style={{
        width: '36px',
        height: '28px',
        justifyContent: 'center',
      }}
    />
  )
}
