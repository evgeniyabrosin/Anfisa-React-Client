import { ReactElement, useState } from 'react'

import { Switch } from '@ui/switch'

export const VisualEditorSwitch = (): ReactElement => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="flex items-center mr-7">
      <Switch isChecked={isChecked} onChange={setIsChecked} />
      <p className="text-14 text-white m-0 ml-2">{'Visual Editor'}</p>
    </div>
  )
}
