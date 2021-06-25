import { Fragment, ReactElement } from 'react'

interface Props {
  name: string
  value?: string[]
}

export const GnomadItem = ({ name, value }: Props): ReactElement => {
  if (!value) return <Fragment />

  return (
    <div className="flex items-center leading-16px">
      <span className="font-bold mr-1 whitespace-nowrap">{`${name}:`}</span>
      <span>{Number(value).toFixed(5)}</span>
    </div>
  )
}
