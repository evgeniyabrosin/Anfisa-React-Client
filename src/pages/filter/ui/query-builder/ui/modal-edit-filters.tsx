import { ReactElement, useEffect, useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Pagintaion } from '@components/pagintaion'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { createChunks } from '@utils/createChunks'
import { QueryBuilderSearch } from '../query-builder-search'
import { EditModalButtons } from './edit-modal-buttons'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { ModsDivider } from './mods-divider'

export const ModalEditFilters = observer(
  (): ReactElement => {
    const ref = useRef(null)

    const currentGroup =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[
        dtreeStore.groupIndexToChange
      ]

    const indexOfCurrentGroup = dtreeStore.groupIndexToChange
    const groupName = dtreeStore.groupNameToChange

    const selectedGroupsAmount =
      currentGroup.length > 0 ? dtreeStore.selectedFilters : []

    const currentGroupLength =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[
        indexOfCurrentGroup
      ].length

    useEffect(() => {
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[
        indexOfCurrentGroup
      ][currentGroupLength - 1].map((item: string) =>
        dtreeStore.addSelectedFilter(item),
      )

      return () => {
        dtreeStore.resetSelectedFilters()
      }
    }, [indexOfCurrentGroup, currentGroupLength])

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
      } else {
        dtreeStore.removeSelectedFilter(name)
      }
    }

    const handleSaveChanges = () => {
      changeEnumAttribute()
      dtreeStore.closeModalEditFilters()
    }

    const handleClose = () => {
      dtreeStore.closeModalEditFilters()
      dtreeStore.resetSelectedFilters()
    }

    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

    const handleChange = (value: string) => {
      setSearchValue(value)

      if (currentPage === 0) return

      setCurrentPage(0)
    }

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    const selectedGroup = subGroups
      .find(subGroup => subGroup.find(element => element.name === groupName))
      ?.find(element => element.name === groupName)

    const originGroupList: any[] = selectedGroup?.variants ?? []

    const filteredGroupList = originGroupList.filter(
      (variant: [string, number]) =>
        variant[0]
          .toLocaleLowerCase()
          .startsWith(searchValue.toLocaleLowerCase()),
    )

    const groupsPerPage = 100
    const chunks = createChunks(filteredGroupList, groupsPerPage)

    return (
      <ModalBase refer={ref} minHeight={200}>
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

        <div className="flex justify-between items-center w-full mt-4 text-14">
          <div className="text-14 text-grey-blue">
            {currentGroup.length > 0 ? dtreeStore.selectedFilters.length : 0}{' '}
            {t('dtree.selected')}
          </div>

          <div className="flex">
            <div className="flex items-center">
              <Checkbox checked={false} className="mr-1 cursor-pointer" />
              <div className="text-14 font-normal">{t('ds.notMode')}</div>
            </div>

            <ModsDivider />

            <div className="text-blue-bright">{t('general.selectAll')}</div>

            <ModsDivider />

            <div className="text-blue-bright">{t('general.clearAll')}</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto my-4 text-14">
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

        <EditModalButtons
          handleClose={handleClose}
          handleSaveChanges={handleSaveChanges}
          disabled={selectedGroupsAmount.length === 0}
        />
      </ModalBase>
    )
  },
)
