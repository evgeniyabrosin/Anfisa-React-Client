import { Fragment, MouseEvent, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'
import cn, { Argument } from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'

interface IPopperButtonProps {
  ButtonElement: React.ElementType
  ModalElement: React.ElementType
  ButtonProps?: any
  ModalProps?: any
  ButtonElementClassName?: Argument
  title?: string
  data?: string[]
  type?: string
}

export const PopperButton = ({
  ButtonElement,
  ModalElement,
  ButtonProps,
  ModalProps,
  ButtonElementClassName,
  title,
  data,
  type,
}: IPopperButtonProps): ReactElement => {
  const [isOpen, open, close] = useToggle(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Fragment>
      {data && data.length === 0 && type && (
        <ButtonElement
          {...ButtonProps}
          refEl={setReferenceElement}
          isOpen={isOpen}
          className={cn(ButtonElementClassName)}
          onMouseUp={(event: MouseEvent<HTMLButtonElement>) => {
            isOpen && event.stopPropagation()
          }}
          onClick={isOpen ? close : open}
        />
      )}
      {!type && (
        <ButtonElement
          {...ButtonProps}
          refEl={setReferenceElement}
          isOpen={isOpen}
          className={cn(ButtonElementClassName)}
          onMouseUp={(event: MouseEvent<HTMLButtonElement>) => {
            isOpen && event.stopPropagation()
          }}
          onClick={isOpen ? close : open}
        />
      )}

      {isOpen && (
        <div
          ref={setPopperElement}
          className="z-50 mt-2"
          style={styles.popper}
          {...attributes.popper}
        >
          <ModalElement {...ModalProps} close={close} title={title} />
        </div>
      )}
    </Fragment>
  )
}
