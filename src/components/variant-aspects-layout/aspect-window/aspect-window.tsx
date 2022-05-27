import { forwardRef, ReactElement } from 'react'

import { IAspectWindowProps } from './aspect-window.interface'
import { AspectWindowBase } from './aspect-window-base'
import { AspectWindowGeneral } from './aspect-window-general'
import { AspectWindowTranscripts } from './aspect-window-transcripts'

export const AspectWindow = forwardRef<HTMLDivElement, IAspectWindowProps>(
  ({ igvUrl, ...props }, ref): ReactElement => {
    switch (props.aspect.name) {
      case 'view_gen':
        return <AspectWindowGeneral rootRef={ref} igvUrl={igvUrl} {...props} />
      case 'view_transcripts':
        return <AspectWindowTranscripts rootRef={ref} {...props} />
      default:
        return <AspectWindowBase rootRef={ref} {...props} />
    }
  },
)

AspectWindow.displayName = 'AspectWindow'
