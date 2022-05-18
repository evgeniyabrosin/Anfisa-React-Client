import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'

interface IPanelButtons {
  onSubmit: () => void
  resetFields: () => void
  disabled?: boolean
}

export const PanelButtons = observer(
  ({ onSubmit, resetFields, disabled }: IPanelButtons): ReactElement => {
    const handleClear = () => {
      filterStore.resetStatFuncData()
      filterStore.setTouched(true)
      resetFields()
    }

    const isRedactorMode = filterStore.isRedactorMode

    return (
      <div className="flex items-center justify-end mt-5">
        <Button
          text={t('general.clear')}
          variant={'secondary'}
          onClick={handleClear}
          className="px-5 mr-2"
        />

        <div className="flex justify-end">
          <Button
            text={
              isRedactorMode ? t('dtree.saveChanges') : t('dtree.addAttribute')
            }
            onClick={onSubmit}
            disabled={disabled}
          />
        </div>
      </div>
    )
  },
)
