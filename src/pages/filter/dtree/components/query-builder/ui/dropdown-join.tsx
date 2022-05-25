import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import stepStore from '@store/dtree/step.store'
import { Card } from '@ui/card'

interface IProps {
  close: () => void
  index: number
  groupNo: number
}

export const DropDownJoin = observer(
  ({ close, index, groupNo }: IProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, close)

    const currentGroup = stepStore.steps[index].groups[groupNo]

    const handleJoin = (type: string) => {
      currentGroup[currentGroup.length - 2] = type
      close()
    }

    return (
      <div ref={ref} className="top-10 absolute z-50">
        <Card className="z-50 top-8 w-28 flex flex-col justify-between px-0 py-0 bg-white rounded-md">
          <div
            onClick={() => handleJoin('and')}
            className="text-14 cursor-pointer rounded-br-none rounded-bl-none rounded-l-md rounded-r-md font-normal py-2 px-2 hover:bg-blue-bright hover:text-white"
          >
            {t('dtree.joinByAnd')}
          </div>

          <div
            onClick={() => handleJoin('or')}
            className="text-14 cursor-pointer font-normal py-2 px-2 hover:bg-blue-bright hover:text-white rounded-bl-md rounded-br-md"
          >
            {t('dtree.joinByOr')}
          </div>
        </Card>
      </div>
    )
  },
)
