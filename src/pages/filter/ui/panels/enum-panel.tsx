import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import { ConditionJoinMode } from '@service-providers/common'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import filterAttributesStore from '../filterAttributes.store'
import { QueryBuilderSearch } from '../query-builder/query-builder-search'
import { AllNotMods } from '../query-builder/ui/all-not-mods'
import { SelectedGroupItem } from '../selected-group-item'

const variantsPerPage = 12

export const EnumPanel = observer((): ReactElement => {
  const {
    currentGroup: { groupName },
    allEnumVariants,
    groupSubKind,
  } = filterAttributesStore

  const { selectedFilter, isRedactorMode } = filterStore

  const [selectedVariants, setSelectedVariants] = useState<string[]>([])

  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  // set/reset data
  useEffect(() => {
    if (selectedFilter && isRedactorMode) {
      const selectedFilters = selectedFilter[3] || []

      const conditionJoinType = selectedFilter[2] as ConditionJoinMode

      filterAttributesStore.setCurrentMode(
        getCurrentModeType(conditionJoinType),
      )

      setSelectedVariants(selectedFilters)
    }

    if (!isRedactorMode) {
      setSelectedVariants([])
      setCurrentPage(0)
      setSearchValue('')
    }

    return () => filterAttributesStore.resetCurrentMode()
  }, [isRedactorMode, selectedFilter])

  useEffect(() => {
    setSearchValue('')
    setCurrentPage(0)
  }, [groupName])

  const preparedSearchValue = searchValue.toLocaleLowerCase()

  const filteredVariants = allEnumVariants.filter(variant =>
    variant[0].toLocaleLowerCase().includes(preparedSearchValue),
  )

  const pagesCount = Math.ceil(filteredVariants.length / variantsPerPage)

  const variantsPage = filteredVariants.slice(
    currentPage * variantsPerPage,
    (currentPage + 1) * variantsPerPage,
  )

  const handleCheckGroupItem = (
    checked: boolean,
    variant: [string, number],
  ) => {
    const variantName = variant[0]

    if (checked) {
      setSelectedVariants([...selectedVariants, variantName])
    } else {
      setSelectedVariants(
        selectedVariants.filter(element => element !== variantName),
      )
    }
  }

  const handleClear = () => {
    setSelectedVariants([])

    setCurrentPage(0)

    filterAttributesStore.resetCurrentMode()
  }

  const handleAddConditions = () => {
    filterAttributesStore.addValuesToCurrentGroupEnumFilter(selectedVariants)
    setCurrentPage(0)
    setSelectedVariants([])
    filterStore.resetSelectedGroupItem()
    filterStore.resetActiveFilterId()
  }

  const handleChange = (value: string) => {
    setSearchValue(value)

    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }

  const isBlockAddBtn = selectedVariants.length === 0

  return (
    <div>
      <div className="flex mt-3">
        <QueryBuilderSearch
          value={searchValue}
          onChange={handleChange}
          isSubgroupItemSearch
        />
      </div>

      <div className="flex justify-end mt-2 -mb-4">
        <AllNotMods
          groupSubKind={groupSubKind}
          isAllModeChecked={filterAttributesStore.currentMode === ModeTypes.All}
          isNotModeChecked={filterAttributesStore.currentMode === ModeTypes.Not}
          isAllModeDisabled={selectedVariants.length < 2}
          isNotModeDisabled={selectedVariants.length === 0}
          toggleAllMode={() =>
            filterAttributesStore.setCurrentMode(ModeTypes.All)
          }
          toggleNotMode={() =>
            filterAttributesStore.setCurrentMode(ModeTypes.Not)
          }
        />
      </div>

      <div className="mt-4">
        <div className="flex-1 mt-4 overflow-y-auto">
          {variantsPage.length > 0 ? (
            variantsPage.map(variant => (
              <SelectedGroupItem
                key={variant[0]}
                isSelected={selectedVariants.includes(variant[0])}
                variant={variant}
                handleCheckGroupItem={handleCheckGroupItem}
              />
            ))
          ) : (
            <div className="flex justify-center items-center text-14 text-grey-blue">
              {t('dtree.noFilters')}
            </div>
          )}
        </div>
      </div>

      {pagesCount > 1 && (
        <Pagintaion
          pagesNumbers={pagesCount}
          currentPage={currentPage}
          setPageNumber={setCurrentPage}
        />
      )}
      <div className="flex items-center justify-end mt-2">
        <Button
          variant="secondary"
          text={t('general.clear')}
          onClick={handleClear}
          className="px-5 mr-2"
        />

        <Button
          text={
            isRedactorMode ? t('dtree.saveChanges') : t('dtree.addAttribute')
          }
          onClick={handleAddConditions}
          disabled={isBlockAddBtn}
        />
      </div>
    </div>
  )
})
