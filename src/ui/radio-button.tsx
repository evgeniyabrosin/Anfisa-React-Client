import { ReactElement } from 'react'

interface Props {
  isChecked: boolean
}
export const RadioButton = ({ isChecked }: Props): ReactElement => (
  <input type="radio" checked={isChecked} />
)
