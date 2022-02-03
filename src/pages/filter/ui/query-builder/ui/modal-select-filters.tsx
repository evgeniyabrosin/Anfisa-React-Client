import { ReactElement, useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { Pagintaion } from '@components/pagintaion'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { createChunks } from '@utils/createChunks'
import { QueryBuilderSearch } from '../query-builder-search'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { ModsDivider } from './mods-divider'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectFilters = observer((): ReactElement => {
  const ref = useRef(null)

  const index = dtreeStore.currentStepIndex
  const currentGroup = dtreeStore.stepData[index].groups
  const groupName = dtreeStore.groupNameToChange

  const handleCheckGroupItem = (checked: boolean, name: string) => {
    if (checked) {
      dtreeStore.addSelectedFilter(name)
    } else {
      dtreeStore.removeSelectedFilter(name)
    }
  }

  const handleAddAttribute = (action: ActionType) => {
    addAttributeToStep(action, 'enum')

    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalSelectFilter()
  }

  const handleClose = () => {
    dtreeStore.closeModalSelectFilter()
    dtreeStore.resetSelectedFilters()
  }

  const handleModals = () => {
    dtreeStore.closeModalSelectFilter()
    dtreeStore.openModalAttribute(index)
    dtreeStore.resetSelectedFilters()
  }

  const handleModalJoin = () => {
    dtreeStore.openModalJoin()
  }

  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [isAllFiltersChecked, setIsAllFiltersChecked] = useState(false)

  const handleCheckAll = (checked: boolean) => {
    if (checked && isAllFiltersChecked) return
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    chunks[currentPage]?.forEach(([variantName]: [string, number]) => {
      if (checked) {
        dtreeStore.addSelectedFilter(variantName)
      } else {
        dtreeStore.removeSelectedFilter(variantName)
      }

      setIsAllFiltersChecked(checked)
    })
  }

  const handleChange = (value: string) => {
    setSearchValue(value)

    if (currentPage === 0) return

    setCurrentPage(0)
  }

  const originGroupList: any[] = toJS(dtreeStore.selectedGroups[2]) ?? []

  const filteredGroupList = originGroupList.filter(
    (variant: [string, number]) =>
      variant[0].toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  )

  const groupsPerPage = 100
  const chunks = createChunks(filteredGroupList, groupsPerPage)

  return (
    <ModalBase refer={ref} minHeight={260}>
      <HeaderModal groupName={groupName} handleClose={handleClose} />

      {originGroupList.length > 15 && (
        <div className="flex mt-3">
          <QueryBuilderSearch
            value={searchValue}
            onChange={handleChange}
            isSubgroupItemSearch
          />
        </div>
      )}

      <div className="flex justify-between w-full mt-4 text-14">
        <div className="text-grey-blue">
          {dtreeStore.selectedFilters.length} selected
        </div>

        <div className="flex">
          <div className="flex items-center">
            <Checkbox checked={false} className="mr-1 cursor-pointer" />
            <div className="font-normal">{t('ds.notMode')}</div>
          </div>

          <ModsDivider />

          <div
            className="cursor-pointer text-blue-bright"
            onClick={() => handleCheckAll(true)}
            data-testid={DecisionTreeModalDataCy.selectAllFromAttribute}
          >
            {t('general.selectAll')}
          </div>

          <ModsDivider />

          <div
            className="cursor-pointer text-blue-bright"
            onClick={() => handleCheckAll(false)}
            data-testid={DecisionTreeModalDataCy.clearAllFromAttribute}
          >
            {t('general.clearAll')}
          </div>
        </div>
      </div>

      <div className="flex-1 mt-4 overflow-y-auto">
        {chunks[currentPage] ? (
          chunks[currentPage].map((variant: [string, number]) => {
            const variantName = variant[0]
            const variantNumbers = variant[1]

            return (
              variantNumbers !== 0 && (
                <div
                  key={variantName}
                  className="flex items-center mb-2 text-14"
                >
                  <Checkbox
                    checked={dtreeStore.selectedFilters.includes(variantName)}
                    className="-mt-0.5 mr-1 cursor-pointer"
                    onChange={e =>
                      handleCheckGroupItem(e.target.checked, variantName)
                    }
                  />

                  <span className="text-black">{variantName}</span>

                  <span className="text-grey-blue ml-2">
                    {variantNumbers} {t('dtree.variants')}
                  </span>
                </div>
              )
            )
          })
        ) : (
          <div className="flex justify-center items-center text-14 text-grey-blue">
            {t('dtree.noFilters')}
          </div>
        )}
      </div>

      {filteredGroupList.length > groupsPerPage && (
        <Pagintaion
          pagesNumbers={chunks.length}
          currentPage={currentPage}
          setPageNumber={setCurrentPage}
        />
      )}

      <SelectModalButtons
        handleClose={handleClose}
        handleModals={handleModals}
        handleModalJoin={handleModalJoin}
        disabled={dtreeStore.selectedFilters.length === 0}
        currentGroup={currentGroup}
        handleAddAttribute={handleAddAttribute}
      />
    </ModalBase>
  )
})
