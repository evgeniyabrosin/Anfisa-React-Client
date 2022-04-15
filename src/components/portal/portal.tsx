import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const portalRoot = document.getElementById('portal-root')!
const backdrop = document.createElement('div')
backdrop.classList.add('backdrop')

export const Portal = ({ children }: React.PropsWithChildren<{}>) => {
  useEffect(() => {
    portalRoot.appendChild(backdrop)

    return () => {
      portalRoot.removeChild(backdrop)
    }
  }, [])

  return createPortal(children, backdrop)
}
