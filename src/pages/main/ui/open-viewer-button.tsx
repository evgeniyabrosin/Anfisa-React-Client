import { ReactElement, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { DatasetInfoDataCy } from '@components/data-testid/dataset-info.cy'
import { PopperButton } from '@components/popper-button'
import { GlbPagesNames } from '@glb/glb-names'

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
    dataTestId={DatasetInfoDataCy.openInViewer}
    refEl={refEl}
    size="md"
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

  // todo: might be replaced to shared source
  const goToPage = (name: GlbPagesNames) => {
    const route = getPageRoute(name)

    history.push(`${route}?ds=${dirinfoStore.selectedDirinfoName}`)
    filterStore.setMethod(name)
  }

  useOutsideClick(ref, close)

  return (
    <div
      className="bg-white text-black rounded shadow-card text-12 cursor-pointer flex flex-col"
      ref={ref}
      data-testid={DatasetInfoDataCy.decTreePanel}
    >
      {Object.values(GlbPagesNames)
        .filter(name => name !== GlbPagesNames.Root)
        .map((pageName, index) => {
          return (
            <span
              className="py-1 px-3 rounded hover:bg-blue-light"
              key={index}
              onClick={() => {
                datasetStore.setIsXL(dirinfoStore.dsinfo.kind === 'xl')
                goToPage(pageName)
              }}
            >
              {t(`home.${pageName}`)}
            </span>
          )
        })}
    </div>
  )
}

export const OpenViewerButton = observer(() => {
  return <PopperButton ButtonElement={ButtonBase} ModalElement={Panel} />
})
