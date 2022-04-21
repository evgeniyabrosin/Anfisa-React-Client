import { ReactElement } from 'react'

import {
  ICommonAspectDescriptor,
  IPreAspectDescriptor,
} from '@service-providers/dataset-level/dataset-level.interface'

export const DrawerPreView = ({
  content,
}: ICommonAspectDescriptor & IPreAspectDescriptor): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}
