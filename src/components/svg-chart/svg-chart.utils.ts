import styles from './svg-chart.module.css'

import { createPopper, Instance as PopperInstance } from '@popperjs/core'

const tooltipModifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 8],
    },
  },
]

export class ChartTooltip {
  private popper: PopperInstance | undefined
  private readonly tooltip: HTMLDivElement

  constructor() {
    this.tooltip = document.createElement('div')
    this.tooltip.className = styles.tooltip
    document.body.appendChild(this.tooltip)
  }

  show(reference: Element, content: string) {
    this.tooltip.removeEventListener('transitionend', this.hideHandler)
    this.tooltip.classList.remove(styles.tooltip_hidding)

    if (this.popper) {
      this.popper.destroy()
    }

    this.tooltip.innerHTML = content

    this.popper = createPopper(reference, this.tooltip, {
      placement: 'top',
      modifiers: tooltipModifiers,
    })
    this.tooltip.classList.add(styles.tooltip_shown)
  }

  hide() {
    this.tooltip.classList.add(styles.tooltip_hidding)
    this.tooltip.addEventListener('transitionend', this.hideHandler)
  }

  destroy() {
    this.popper?.destroy()
    this.tooltip?.remove()
  }

  private hideHandler = () => {
    this.tooltip.classList.remove(styles.tooltip_hidding, styles.tooltip_shown)
    if (this.popper) {
      this.popper.destroy()
      this.popper = undefined
    }
  }
}

export const globalTooltip = new ChartTooltip()
