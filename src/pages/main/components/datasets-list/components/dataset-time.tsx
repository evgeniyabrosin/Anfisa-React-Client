import React, { FC } from 'react'
import cn from 'classnames'

import { formatDate, formatTime } from '@core/format-date'

interface IDatasetTimeProps {
  time: string | Date
  isActive?: boolean
}

export const DatasetTime: FC<IDatasetTimeProps> = ({ time, isActive }) => (
  <div
    className={cn(
      'flex ml-auto text-10 leading-18px whitespace-nowrap',
      isActive ? 'text-white' : 'text-grey-blue',
    )}
  >
    <div>{formatDate(time)}</div>

    <div
      className={cn(
        'border-l my-1 mx-1',
        isActive ? 'border-white' : 'border-blue-secondary',
      )}
    />

    <div>{formatTime(time)}</div>
  </div>
)
