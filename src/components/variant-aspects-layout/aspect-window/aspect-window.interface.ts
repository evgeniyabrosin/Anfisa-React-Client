import { HTMLAttributes } from 'react'

import { TAspectDescriptor } from '@service-providers/dataset-level/dataset-level.interface'

export type TWindowToggleHandleParams = {
  name: string
  state: boolean
  windowEl: HTMLDivElement | undefined | null
  contentEl: HTMLDivElement | undefined | null
}

export interface IAspectWindowProps<
  Aspect extends TAspectDescriptor = TAspectDescriptor,
> extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  aspect: Aspect
  isOpen: boolean
  igvUrl?: string
  onToggle?: (params: TWindowToggleHandleParams) => void
}
