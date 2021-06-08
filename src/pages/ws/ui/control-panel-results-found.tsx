import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'

export const EditFilter = observer(
  (): ReactElement => {
    return (
      <div>
        {(datasetStore.filteredNo.length > 0 || datasetStore.activePreset) && (
          <span className="text-sm text-white">
            {t('ds.resultsFound', {
              0: datasetStore.filteredNo.length,
            })}
          </span>
        )}
      </div>
    )
  },
)
