import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { PopperButton } from '@components/popper-button'
import {
  IPopperMenuProps,
  PopperMenu,
} from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { GlbPagesNames } from '@glb/glb-names'
import {
  FilterControlOptions,
  FilterControlOptionsNames,
} from './filter-control.const'

interface ISolutionDropDownProps {
  pageName: FilterControlOptionsNames
  goToPage: (page: FilterControlOptions) => void
}

interface ISolutionSelectButton {
  refEl: HTMLElement
  isOpen: boolean
  onClick?: () => void
}

export const SolutionDropDown = observer(
  ({ pageName, goToPage }: ISolutionDropDownProps): ReactElement => {
    const SolutionSelectButton = ({
      refEl,
      isOpen,
      ...rest
    }: ISolutionSelectButton) => (
      <Button
        refEl={refEl}
        onClick={rest.onClick}
        text={pageName}
        variant="secondary-dark"
        size="md"
        append={
          <Icon
            size={14}
            name="Arrow"
            className={cn(
              'transform transition-transform',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          />
        }
      />
    )

    const SolutionSelectModal = ({ close }: IPopperMenuProps) => (
      <PopperMenu close={close} className="w-32">
        <PopperMenuItem onClick={() => goToPage(GlbPagesNames.Dtree)}>
          <div className="flex items-center justify-between">
            <span className="mr-2">{t('dtree.dtree')}</span>
          </div>
        </PopperMenuItem>

        <PopperMenuItem onClick={() => goToPage(GlbPagesNames.Refiner)}>
          <div className="flex items-center justify-between">
            <span className="mr-2">{t('home.refiner')}</span>
          </div>
        </PopperMenuItem>
      </PopperMenu>
    )

    return (
      <PopperButton
        ButtonElement={SolutionSelectButton}
        ModalElement={SolutionSelectModal}
      />
    )
  },
)
