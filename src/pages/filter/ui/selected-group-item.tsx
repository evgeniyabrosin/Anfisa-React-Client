import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

interface IProps {
  handleCheckGroupItem: (checked: boolean, variant: [string, number]) => void
  setShouldClear: Dispatch<SetStateAction<boolean>>
  variant: [string, number]
  isAdded: boolean
  shouldClear: boolean
}

export const SelectedGroupItem = observer(
  ({
    shouldClear,
    isAdded,
    variant,
    handleCheckGroupItem,
    setShouldClear,
  }: IProps): ReactElement => {
    const [checked, setChecked] = useState(isAdded)

    const handleCheck = (event: any) => {
      setChecked(event.target.checked)
      handleCheckGroupItem(event.target.checked, variant)
    }

    useEffect(() => {
      if (shouldClear) {
        setChecked(false)
        setShouldClear(false)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldClear])

    return (
      <div className="flex items-center mb-2 text-14">
        <Checkbox
          checked={checked}
          className="-mt-0.5 mr-1 cursor-pointer"
          onChange={handleCheck}
        />

        <span className="text-black">{variant[0]}</span>

        <span className="text-grey-blue ml-2">({variant[1]})</span>
      </div>
    )
  },
)
