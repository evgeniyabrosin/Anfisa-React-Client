import { ReactElement } from 'react'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'

export const UndoRedoButtons = (): ReactElement => (
  <div className="flex items-center">
    <div style={{ direction: 'rtl' }}>
      <Button variant="secondary" icon={<Icon name="Undo" />} className="w-8" />
    </div>

    <div className="ml-1.5">
      <Button variant="secondary" icon={<Icon name="Redo" />} className="w-8" />
    </div>

    <div className="ml-2">
      <Icon size={15} name="Close" className="text-white cursor-pointer" />
    </div>
  </div>
)
