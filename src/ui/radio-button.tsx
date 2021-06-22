import { ReactElement } from 'react'

interface Props {
  isChecked: boolean
  onChange?: () => void
}

export const RadioButton = ({ isChecked, onChange }: Props): ReactElement => (
  <input type="radio" checked={isChecked} onChange={onChange} />
)
