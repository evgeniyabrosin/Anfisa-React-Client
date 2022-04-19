import cn from 'classnames'

import { Icon } from '@ui/icon'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { SwitchTheme } from './switch-theme'

interface IProps {
  groupName?: string
  handleClose: () => void
  theme?: string
  isTextEditor?: boolean
  handleChangeTheme?: any
}

export const HeaderModal = ({
  groupName,
  handleClose,
  theme = 'light',
  isTextEditor,
  handleChangeTheme,
}: IProps) => (
  <div className="flex w-full justify-between items-center font-medium">
    <div
      className={cn(theme === 'light' ? 'text-black' : 'text-white', 'flex')}
      data-testid={DecisionTreeModalDataCy.modalHeader}
    >
      {groupName}

      {isTextEditor && (
        <SwitchTheme handleChangeTheme={handleChangeTheme} theme={theme} />
      )}
    </div>

    <Icon
      name="Close"
      size={16}
      className={cn(
        'cursor-pointer',
        theme === 'light' ? 'text-black' : 'text-white',
      )}
      onClick={handleClose}
    />
  </div>
)
