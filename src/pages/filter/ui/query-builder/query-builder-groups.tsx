import { Fragment, ReactElement } from 'react'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { QueryBuilderSearch } from './query-builder-search'
import { QueryBuilderSubgroup } from './query-builder-subgroup'

export const QueryBuilderGroups = observer(
  (): ReactElement => {
    const groupNames = Object.keys(dtreeStore.getQueryBuilder)
    const subGroupData = Object.values(dtreeStore.getQueryBuilder)

    const checkIfCurrentStepIsEmpty = (): boolean => {
      const currentActiveStepIndex = dtreeStore.stepData.findIndex(
        step => step.isActive === true,
      )

      if (dtreeStore.stepData[currentActiveStepIndex]) {
        return !dtreeStore.stepData[currentActiveStepIndex].groups
      }

      return false
    }

    const createStep = () => {
      const currentActiveStepIndex = dtreeStore.stepData.findIndex(
        step => step.isActive === true,
      )

      if (currentActiveStepIndex === -1) {
        toast.error(t('dtree.chooseActiveStep'), {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        })

        return
      }

      const code = dtreeStore.dtreeCode

      dtreeStore.insertStep('AFTER', currentActiveStepIndex)

      const indexForApi = dtreeStore.getStepIndexForApi(
        currentActiveStepIndex + 1,
      )

      dtreeStore.setCurrentStepIndexForApi(indexForApi)
      dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
    }

    return (
      <Fragment>
        <div className="relative pt-4 px-4 w-1/3 bg-blue-lighter">
          <div id="input" className="flex mb-3 w-full static">
            <QueryBuilderSearch
              value={dtreeStore.searchFieldFilterList}
              onChange={dtreeStore.addSearchFieldFilterList}
              isFilter
            />
          </div>

          <div className="flex items-center justify-between w-full h-8 mb-2">
            <div className="text-blue-bright font-medium">
              {t('dtree.showingResultsForStep')} {dtreeStore.stepData.length}
            </div>

            <Button
              className="hover:bg-blue-bright"
              text={t('dtree.addStep')}
              hasBackground={false}
              disabled={checkIfCurrentStepIsEmpty()}
              onClick={createStep}
            />
          </div>

          <div className="h-full overflow-y-auto">
            {groupNames.map((groupName, index) => (
              <QueryBuilderSubgroup
                groupName={groupName}
                subGroupData={subGroupData[index]}
                key={groupName}
                changeIndicator={dtreeStore.filterChangeIndicator}
                isContentExpanded={dtreeStore.isFilterContentExpanded}
              />
            ))}
          </div>
        </div>
      </Fragment>
    )
  },
)
