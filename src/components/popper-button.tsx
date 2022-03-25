import { Fragment, MouseEvent, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'
import cn, { Argument } from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'

interface Props {
  ButtonElement: any
  ModalElement: any
  ButtonElementClassName?: Argument
  title?: string
  data?: any
  type?: string
}

export const PopperButton = ({
  ButtonElement,
  ModalElement,
  ButtonElementClassName,
  title,
  data,
  type,
}: Props): ReactElement => {
  const [isOpen, open, close] = useToggle(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Fragment>
      {data && data.length === 0 && type && (
        <ButtonElement
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
          <ModalElement close={close} title={title} />
        </div>
      )}
    </Fragment>
  )
}
