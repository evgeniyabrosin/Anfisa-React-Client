import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'

interface IPanelButtons {
  onSubmit: () => void
  resetFields: () => void
  disabled?: boolean
  classname?: Argument
}

// TODO: unify this component for all other panels
export const PanelButtons = observer(
  ({
    onSubmit,
    resetFields,
    disabled,
    classname,
  }: IPanelButtons): ReactElement => {
    const handleClear = () => {
      filterStore.resetStatFuncData()
      filterStore.setTouched(true)
      resetFields()
    }

    const isRedactorMode = filterStore.isRedactorMode

    return (
      <div className={cn('flex items-center justify-end mt-4 pb-6', classname)}>
        <Button
          text={t('general.clear')}
          variant={'secondary'}
          onClick={handleClear}
          className="px-5 mr-2"
        />

        <div className="flex justify-end">
          <Button
            text={t(isRedactorMode ? 'dtree.saveChanges' : 'dtree.apply')}
            onClick={onSubmit}
            disabled={disabled}
            className={!isRedactorMode && 'px-8'}
          />
        </div>
      </div>
    )
  },
)
