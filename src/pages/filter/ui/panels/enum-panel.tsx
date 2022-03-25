import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import filterAttributesStore from '../filterAttributes.store'
import { QueryBuilderSearch } from '../query-builder/query-builder-search'
import { AllNotMods } from '../query-builder/ui/all-not-mods'
import { SelectedGroupItem } from '../selected-group-item'

const variantsPerPage = 12

export const EnumPanel = observer((): ReactElement => {
  const {
    currentGroup: { groupName },
    allEnumVariants: variants,
    datasetEnumValues: datasetVariants,
    groupSubKind,
  } = filterAttributesStore

  const [selectedVariants, setSelectedVariants] = useState<string[]>([])

  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setSearchValue('')
    setCurrentPage(0)
    filterAttributesStore.resetCurrentMode()
  }, [groupName])

  const preparedSearchValue = searchValue.toLocaleLowerCase()
  const filteredVariants = variants.filter(variant =>
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
    filterAttributesStore.clearCurrentGroupFilter()
    setSelectedVariants([])
    filterAttributesStore.resetCurrentMode()

    setCurrentPage(0)
  }

  const handleAddConditions = () => {
    filterAttributesStore.addValuesToCurrentGroupEnumFilter(selectedVariants)
    setCurrentPage(0)
    setSelectedVariants([])
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
            variantsPage.map(
              variant =>
                variant[1] !== 0 && (
                  <SelectedGroupItem
                    key={variant[0]}
                    isSelected={selectedVariants.includes(variant[0])}
                    isInDataset={datasetVariants.includes(variant[0])}
                    variant={variant}
                    handleCheckGroupItem={handleCheckGroupItem}
                  />
                ),
            )
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
      <div className="flex items-center justify-between mt-1 pb-2">
        <Button
          variant="secondary"
          text={t('general.clear')}
          onClick={handleClear}
        />

        <Button
          text={t('general.add')}
          onClick={handleAddConditions}
          disabled={isBlockAddBtn}
        />
      </div>
    </div>
  )
})
