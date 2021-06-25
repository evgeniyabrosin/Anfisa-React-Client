import { Fragment, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'
import cn, { Argument } from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'

interface Props {
  ButtonElement: any
  ModalElement: any
  ButtonElementClassName?: Argument
}

export const PopperButton = ({
  ButtonElement,
  ModalElement,
  ButtonElementClassName,
}: Props): ReactElement => {
  const [isOpen, open, close] = useToggle(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Fragment>
      <ButtonElement
        refEl={setReferenceElement}
        isOpen={isOpen}
        className={cn(ButtonElementClassName)}
        onClick={isOpen ? close : open}
      />

      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <ModalElement close={close} />
        </div>
      )}
    </Fragment>
  )
}
