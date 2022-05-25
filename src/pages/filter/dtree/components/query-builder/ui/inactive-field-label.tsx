import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { deleteAttribute } from '@utils/changeAttribute/deleteAttribute'
import stepStore, {
  ActiveStepOptions,
} from '../../../../../../store/dtree/step.store'

interface IInactiveFieldProps {
  stepNo: number
  groupIndex: number
}

export const InactiveFieldLabel = observer(
  ({ stepNo, groupIndex }: IInactiveFieldProps) => {
    const handleDeleteAttribute = () => {
      stepStore.makeStepActive(stepNo - 1, ActiveStepOptions.StartedVariants)

      deleteAttribute(groupIndex)
    }
    return (
      <div className="flex items-center border border-red-secondary rounded-md px-1 py-px">
        <span className="ml-1 text-12 leading-5 font-normal text-red-secondary">
          {t('dtree.inactiveField')}
        </span>

        <Icon
          name="Close"
          size={14}
          className="ml-1 cursor-pointer text-red-secondary"
          onClick={handleDeleteAttribute}
        />
      </div>
    )
  },
)
