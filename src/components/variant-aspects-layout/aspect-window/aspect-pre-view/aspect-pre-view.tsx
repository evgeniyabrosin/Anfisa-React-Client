import { ReactElement } from 'react'
import cn from 'classnames'

import { IPreAspectDescriptor } from '@service-providers/dataset-level/dataset-level.interface'

interface IAspectPreViewProps {
  className?: string
  aspect: IPreAspectDescriptor
}

export const AspectPreView = ({
  className,
  aspect,
}: IAspectPreViewProps): ReactElement => {
  return <pre className={cn('p-3', className)}>{aspect.content}</pre>
}
