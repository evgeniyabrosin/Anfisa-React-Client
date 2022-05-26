import {
  TArrowButtonDirection,
  TArrowButtonSize,
} from '@ui/arrow-button/arrow-button.interface'
import { TIcons } from '@ui/icon'

export const getArrowButtonIcon = (
  size: TArrowButtonSize,
  direction: TArrowButtonDirection,
): TIcons => {
  if (size === 'sm') {
    switch (direction) {
      case 'up':
        return 'ArrowUpXs'
      case 'down':
        return 'ArrowDownXs'
      case 'left':
        return 'ArrowLeftXs'
      case 'right':
        return 'ArrowRightXs'
    }
  } else {
    switch (direction) {
      case 'up':
        return 'ArrowUpS'
      case 'down':
        return 'ArrowDownS'
      case 'left':
        return 'ArrowLeftS'
      case 'right':
        return 'ArrowRightS'
    }
  }
}
