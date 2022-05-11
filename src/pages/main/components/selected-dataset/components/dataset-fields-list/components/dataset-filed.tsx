import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { Card, CardTitle } from '@ui/card'

interface IDatasetFieldProps {
  label: string
  value: string
  className?: Argument
}

export const DatasetField = ({
  label,
  value,
  className,
}: IDatasetFieldProps): ReactElement | null => {
  if (!value) return null

  return (
    <Card className={cn(className)}>
      <CardTitle text={label} size="sm" />
      <div className="text-base text-blue-bright leading-18px font-medium">
        {value}
      </div>
    </Card>
  )
}
