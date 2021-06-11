import { ReactElement } from 'react'

interface Props {
  value: string
}

export const ProteinChangeItem = ({ value }: Props): ReactElement => {
  return <span className="text-10 truncate">{value}</span>
}
