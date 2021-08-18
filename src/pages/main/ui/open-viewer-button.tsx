import { ReactElement, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { PopperButton } from '@components/popper-button'

interface PropsButton {
  isOpen?: boolean
  refEl: any
  className?: Argument
  onClick?: () => void
}

interface PropsPanel {
  close: () => void
}

const ButtonBase = ({
  isOpen,
  refEl,
  className,
  ...rest
}: PropsButton): ReactElement => (
  <Button
    text={t('home.openInViewer')}
    refEl={refEl}
    size="sm"
    className="py-2 px-4"
    onClick={rest.onClick}
    append={
      <Icon
        name="Arrow"
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)

const Panel = ({ close }: PropsPanel): ReactElement => {
  const ref = useRef<any>(null)
  const history = useHistory()

  const goToWs = () => {
    datasetStore.setIsXL(dirinfoStore.dsinfo.kind === 'xl')
    history.push(`/ws?ds=${dirinfoStore.selectedDirinfoName}`)
  }

  const goToFilter = () => {
    datasetStore.setIsXL(dirinfoStore.dsinfo.kind === 'xl')
    history.push(`/filter?ds=${dirinfoStore.selectedDirinfoName}`)
  }

  useOutsideClick(ref, close)

  return (
    <div
      className="bg-white text-black rounded shadow-card text-12 cursor-pointer flex flex-col"
      ref={ref}
    >
      {dirinfoStore.dsinfo.kind === 'ws' && (
        <span
          className="py-1 px-3 rounded hover:bg-blue-light"
          onClick={goToWs}
        >
          {t('home.table')}
        </span>
      )}

      <span
        className="py-1 px-3 rounded hover:bg-blue-light"
        onClick={goToFilter}
      >
        {t('home.filter')}
      </span>
    </div>
  )
}

export const OpenViewerButton = observer(() => {
  return <PopperButton ButtonElement={ButtonBase} ModalElement={Panel} />
})
