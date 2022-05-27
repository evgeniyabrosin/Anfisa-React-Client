import { ReactElement } from 'react'

import { IPreAspectDescriptor } from '@service-providers/dataset-level/dataset-level.interface'

interface IAspectPreViewProps {
  className?: string
  aspect: IPreAspectDescriptor
}

export const AspectPreView = ({
  className,
  aspect,
}: IAspectPreViewProps): ReactElement => {
  return <pre className={className}>{aspect.content}</pre>
}
