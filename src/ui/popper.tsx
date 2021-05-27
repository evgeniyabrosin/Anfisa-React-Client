import { Fragment, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'

import { ANYType } from '@declarations'
import { useToggle } from '@core/hooks/use-toggle'

interface Props {
  ButtonElement: ANYType
  ModalElement: ANYType
}

export const Popper = ({
  ButtonElement,
  ModalElement,
}: Props): ReactElement => {
  const [isOpen, open, close] = useToggle(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<ANYType>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Fragment>
      <ButtonElement
        refEl={setReferenceElement}
        isOpen={isOpen}
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
