import { ReactElement, useRef } from 'react'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import filterStore from '@store/filter'

interface Props {
  close: () => void
}

const actions = [
  ActionFilterEnum.Load,
  ActionFilterEnum.Create,
  ActionFilterEnum.Modify,
  ActionFilterEnum.Join,
  ActionFilterEnum.Delete,
]

export const FilterModal = ({ close }: Props): ReactElement => {
  const ref = useRef(null)

  const handleClick = (action: ActionFilterEnum) => {
    filterStore.setActionName(action)
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
