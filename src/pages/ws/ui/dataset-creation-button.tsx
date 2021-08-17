import { Fragment, ReactElement, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import operations from '@store/operations'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Attention } from '@ui/icons/attention'
import { Input } from '@ui/input'
import { PopperButton } from '@components/popper-button'
import { ControlPanelDivider } from './control-panel-divider'

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
    text={t('dsCreation.saveDataset')}
    refEl={refEl}
    size="md"
    className="w-full"
    onClick={rest.onClick}
  />
)

const Panel = observer(
  ({ close }: PropsPanel): ReactElement => {
    const ref = useRef<any>(null)
    const history = useHistory()
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    useOutsideClick(ref, close)

    const isDone = operations.savingStatus[1] === 'Done'

    const handleClickAsync = async () => {
      if (!value) {
        return 'Name is empty'
      }

      const result = await operations.saveDatasetAsync(value)

      if (!result.ok && result.message) {
        setError(result.message)

        return
      }

      isDone && history.push(`${Routes.WS}?ds=${value}`)
    }

    return (
      <div className="bg-white rounded shadow-card flex flex-col p-4" ref={ref}>
        <p className="text-blue-dark font-bold">
          {t('dsCreation.addDatasetTitle')}
        </p>
        <div className="mt-6">
          <span className="text-14">{t('dsCreation.label')}</span>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            className="mb-2"
          />
          <span className="text-red-secondary mt-2">{error}</span>
        </div>

        <p className="mt-5 flex items-center">
          <Attention className="mr-2" />
          <span>{t('dsCreation.attention')}</span>
        </p>

        <span className="mt-2">
          {operations.savingStatus[1]}
          {isDone && (
            <span
              className="ml-2 text-blue-bright cursor-pointer"
              onClick={() => isDone && history.push(`${Routes.WS}?ds=${value}`)}
            >
              Open It
            </span>
          )}
        </span>

        <div className="flex ml-auto mt-6">
          <Button
            text={t('general.cancel')}
            hasBackground={false}
            className="text-black"
            onClick={close}
          />
          <Button
            text={t('dsCreation.addDataset')}
            className="ml-4 text-black"
            disabled={!value}
            hasBackground={false}
            onClick={handleClickAsync}
          />
        </div>
      </div>
    )
  },
)

export const DatasetCreationButton = () => {
  return (
    <Fragment>
      <ControlPanelDivider />

      <div className="self-stretch">
        <div className="text-grey-blue text-14 font-bold mb-2 whitespace-nowrap">
          {t('dsCreation.datasetCreation')}
        </div>
        <PopperButton ButtonElement={ButtonBase} ModalElement={Panel} />
      </div>
    </Fragment>
  )
}
