import React, { ReactElement } from 'react'

import { Button } from '@ui/button'

export interface INoResultsFoundProps {
  text: string
  className?: string
  action?: INoResultsAction
}

export interface INoResultsAction {
  text: string
  handler: () => void
}

export const NoResultsFound = ({
  text,
  className,
  action,
}: React.PropsWithChildren<INoResultsFoundProps>): ReactElement => {
  const renderAction = () => {
    if (!action) return

    return (
      <div className="mt-3">
        <Button
          text={action.text}
          variant="secondary"
          onClick={action.handler}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className={className ? className : 'text-grey-blue'}>{text}</div>
      {renderAction()}
    </div>
  )
}
