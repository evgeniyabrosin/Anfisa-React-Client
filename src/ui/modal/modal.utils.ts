import { createElement, ReactNode } from 'react'
import { TransitionStatus } from 'react-transition-group'

import { IModalProps } from './modal.interface'

export const modalContainer = document.body

function getPaddingRight(): number {
  return parseInt(window.getComputedStyle(modalContainer).paddingRight, 10) || 0
}

let modalsCount = 0
let keepOverflow: string | undefined
let keepPaddingRight: string | undefined

export function handleModalOpen(): void {
  if (modalsCount === 0) {
    const scrollBarSize =
      window.innerWidth - document.documentElement.clientWidth

    keepPaddingRight = modalContainer.style.paddingRight
    keepOverflow = modalContainer.style.overflow

    if (scrollBarSize > 0) {
      modalContainer.style.paddingRight = `${
        getPaddingRight() + scrollBarSize
      }px`
    }

    modalContainer.style.overflow = 'hidden'
  }

  modalsCount++
}

export function handleModalClose(): void {
  if (modalsCount > 0) {
    modalsCount--
  }

  if (modalsCount === 0) {
    if (keepPaddingRight) {
      modalContainer.style.paddingRight = keepPaddingRight
    } else {
      modalContainer.style.removeProperty('padding-right')
    }

    if (keepOverflow) {
      modalContainer.style.overflow = keepOverflow
    } else {
      modalContainer.style.removeProperty('overflow')
    }
  }
}

type TRenderContentParams = {
  props: IModalProps
  state: TransitionStatus
  isMounted: boolean
}

export const renderContent = (params: TRenderContentParams): ReactNode => {
  const {
    props: { transitionDuration, render, component, children },
    state,
    isMounted,
  } = params

  const renderProps = { isMounted, state, transitionDuration }

  if (render) {
    return render(renderProps)
  }

  if (component) {
    return createElement(component, renderProps)
  }

  if (children) {
    return children(renderProps)
  }

  throw new Error(
    'Must specify either a render prop, a render function as children, or a component prop for Modal',
  )
}
