import { Fragment, ReactElement } from 'react'
import cn from 'classnames'

import { getVariantClass } from '@core/get-variant-color'
import { CircleSvg } from '@icons/circle'

interface Props {
  name: string
  value?: string[]
}

export const PredictionItem = ({ name, value }: Props): ReactElement => {
  if (!value || value?.length === 0) {
    return <Fragment />
  }

  return (
    <div className="flex text-10 leading-16px items-center">
      <CircleSvg className={cn('mr-1', getVariantClass(value[0][1]))} />

      {`${name}: ${value[0][0]}`}
    </div>
  )
}
