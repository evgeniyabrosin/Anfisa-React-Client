import { ReactElement, useRef } from 'react'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'

interface IPresetActionsModalProps {
  close: () => void
  onSelect: (action: ActionFilterEnum) => void
}

const actions = [
  ActionFilterEnum.Create,
  ActionFilterEnum.Modify,
  ActionFilterEnum.Join,
  ActionFilterEnum.Delete,
]

export const PresetActionsModal = ({
  close,
  onSelect,
}: IPresetActionsModalProps): ReactElement => {
  const ref = useRef(null)

  const handleClick = (action: ActionFilterEnum) => {
    onSelect(action)
    close()
  }

  useOutsideClick(ref, close)

  return (
    <div
      className="bg-white w-24 flex flex-col rounded text-12 leading-12px"
      ref={ref}
    >
      {actions.map(action => (
        <span
          key={action}
          onClick={() => handleClick(action)}
          className="px-2 py-1 cursor-pointer hover:bg-blue-bright hover:text-white"
        >
          {action}
        </span>
      ))}
    </div>
  )
}
