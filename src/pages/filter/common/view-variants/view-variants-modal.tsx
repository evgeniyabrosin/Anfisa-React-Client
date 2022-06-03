import { ReactElement, useEffect } from 'react'

import { Modal } from '@ui/modal'
import { IDsListArguments } from '@service-providers/dataset-level'
import { viewVariantsStore } from './store'
import { ViewVariantsWindow } from './view-variants-window'

export interface IViewVariantsModalProps {
  isOpen: boolean
  onClose: () => void
  query: IDsListArguments | undefined
}

export const ViewVariantsModal = ({
  isOpen,
  onClose,
  query,
}: IViewVariantsModalProps): ReactElement => {
  useEffect(() => {
    if (isOpen) {
      if (query) {
        viewVariantsStore.dsList.setQuery(query)
      } else {
        viewVariantsStore.dsList.reset()
      }
    }
  }, [isOpen, query])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      transitionDuration={300}
      render={({ state }) => (
        <ViewVariantsWindow state={state} onClose={onClose} />
      )}
    />
  )
}
