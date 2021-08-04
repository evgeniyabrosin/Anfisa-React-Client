import { ReactElement, ReactNode } from 'react'

interface ControlPanelTitleProps {
  title: string
  children?: ReactElement | ReactNode
}

export const ControlPanelTitle = ({
  title,
  children,
}: ControlPanelTitleProps): ReactElement => (
  <div className={'text-sm leading-16px flex justify-between'}>
    <div className="text-grey-blue font-medium mb-2 mr-3">{title}</div>
    {children}
  </div>
)
