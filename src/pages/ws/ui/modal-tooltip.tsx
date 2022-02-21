import { PropsWithChildren, ReactElement, ReactNode } from 'react'

export const ModalTooltip = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => (
  <div className="absolute flex flex-wrap items-center h-full px-2 top-0 z-50 shadow-dark rounded-md bg-white">
    {children}
  </div>
)
