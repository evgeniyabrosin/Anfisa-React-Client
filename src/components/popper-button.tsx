import { Fragment, MouseEvent, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'
import cn, { Argument } from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'

// TODO: types
interface Props {
  ButtonElement: any
  ButtonProps?: any
  ModalElement: any
  ModalProps?: any
  ButtonElementClassName?: Argument
  title?: string
  data?: any
  type?: string
  onClick?: (event?: any) => void
}

export const PopperButton = ({
  ButtonElement,
  ButtonProps,
  ModalElement,
  ModalProps,
  ButtonElementClassName,
  title,
  data,
  type,
  onClick,
}: Props): ReactElement => {
  const [isOpen, open, close] = useToggle(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  const onClickHandler = (event: MouseEvent) => {
    onClick && onClick(event)
    isOpen ? close() : open()
  }

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
          onClick={onClickHandler}
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
          onClick={onClickHandler}
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
