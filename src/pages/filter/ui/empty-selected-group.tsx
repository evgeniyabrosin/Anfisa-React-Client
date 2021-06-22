import { ReactElement } from 'react'

export const EmptySelectedGroup = (): ReactElement => (
  <div className="w-1/3 bg-grey-lighter">
    <div
      className="flex items-center justify-center"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <p className="text-16 leading-16px text-grey-blue align-center">
        Select a filter
      </p>
    </div>
  </div>
)
