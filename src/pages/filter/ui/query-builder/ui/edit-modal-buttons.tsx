import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { deleteAttribute } from '@utils/changeAttribute/deleteAttribute'

interface IProps {
  handleClose: () => void
  handleSaveChanges: () => void
  disabled: any
}

export const EditModalButtons = observer(
  ({ handleClose, disabled, handleSaveChanges }: IProps) => {
    const handleDeleteAttribute = () => {
      deleteAttribute()
      handleClose()
    }

    return (
      <div className="flex justify-between items-center">
        <Button
          text={t('dtree.deleteAttribute')}
          isBlackText
          hasBackground={false}
          className="border-red-secondary hover:text-white hover:bg-red-secondary"
          onClick={handleDeleteAttribute}
        />

        <div className="flex">
          <Button
            text={t('general.cancel')}
            isBlackText
            hasBackground={false}
            className="mr-2 hover:bg-blue-bright hover:text-white"
            onClick={handleClose}
          />

          <div className="relative">
            <Button
              disabled={disabled}
              text={t('dtree.saveChanges')}
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </div>
    )
  },
)
