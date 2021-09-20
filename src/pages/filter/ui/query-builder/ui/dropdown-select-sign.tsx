import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'

interface IProps {
  close: () => void
  setDropType: (value: boolean) => void
}

export const DropDownSelectSign = observer(
  ({ close, setDropType }: IProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, close)

    const handleClick = (type = 'less') => {
      type === 'less' ? setDropType(false) : setDropType(true)
      close()
    }

    return (
      <div ref={ref} className="top-16 absolute z-50">
        <div className="w-12 flex flex-col justify-between px-0 py-0 bg-white rounded-md shadow-dark">
          <div
            onClick={() => handleClick()}
            className="flex items-center justify-center h-full bg-blue-medium cursor-pointer rounded-br-none rounded-bl-none rounded-l-md rounded-r-md text-blue-bright hover:bg-blue-bright hover:text-white"
          >
            {`<`}
          </div>

          <div
            onClick={() => handleClick('lessEqual')}
            className="flex items-center justify-center h-full bg-blue-medium cursor-pointer rounded-bl-md rounded-br-md text-blue-bright hover:bg-blue-bright hover:text-white"
          >
            {`≤`}
          </div>
        </div>
      </div>
    )
  },
)
