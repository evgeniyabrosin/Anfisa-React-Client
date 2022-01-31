import { ReactElement } from 'react'

interface Props {
  isChecked: boolean
  onChange?: () => void
  isDisabled?: boolean
}

export const RadioButton = ({
  isChecked,
  onChange,
  isDisabled,
}: Props): ReactElement => (
  <input
    type="radio"
    checked={isChecked}
    onChange={onChange}
    disabled={isDisabled}
  />
)
