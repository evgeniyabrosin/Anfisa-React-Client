import React, { FC } from 'react'
import cn from 'classnames'

import { formatDate, formatTime } from '@core/format-date'

interface IDatasetTimeProps {
  time: string | Date
  isActive?: boolean
}

export const DatasetTime: FC<IDatasetTimeProps> = ({ time, isActive }) => (
  <div
    className={cn('flex ml-auto text-10 leading-18px whitespace-nowrap', {
      'text-white': isActive,
      'text-grey-blue': !isActive,
    })}
  >
    <div>{formatDate(time)}</div>

    <div
      className={cn('border-l my-1 mx-1', {
        'border-white': isActive,
        'border-blue-secondary': !isActive,
      })}
    />

    <div>{formatTime(time)}</div>
  </div>
)
