import { Fragment, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { Card, CardTitle } from '@ui/card'

interface Props {
  label: string
  value: string
  className?: Argument
}

export const DatasetField = ({
  label,
  value,
  className,
}: Props): ReactElement => {
  if (!value) return <Fragment />

  return (
    <Card className={cn(className)}>
      <CardTitle text={label} size="sm" />
      <div className="text-base text-blue-bright leading-18px font-medium">
        {value}
      </div>
    </Card>
  )
}
