import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import { TVariant } from '@service-providers/common'
import filterAttributesStore from '../current-filter.store'
import { QueryBuilderSearch } from '../query-builder/query-builder-search'
import { AllNotMods } from '../query-builder/ui/all-not-mods'
import { SelectedGroupItem } from '../selected-group-item'

const variantsPerPage = 12

export const EnumPanel = observer((): ReactElement => {
  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = filterAttributesStore

  const [mode, setMode] = useState(initialEnumMode)
  const [selectedVariants, setSelectedVariants] = useState(
    initialEnumVariants ?? [],
  )

  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setSearchValue('')
    setCurrentPage(0)
  }, [attributeName])

  const preparedSearchValue = searchValue.toLocaleLowerCase()

  const filteredVariants = enumVariants.filter(variant =>
    variant[0].toLocaleLowerCase().includes(preparedSearchValue),
  )

  const pagesCount = Math.ceil(filteredVariants.length / variantsPerPage)

  const variantsPage = filteredVariants.slice(
    currentPage * variantsPerPage,
    (currentPage + 1) * variantsPerPage,
  )

  const handleCheckGroupItem = (checked: boolean, variant: TVariant) => {
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
    setMode(undefined)
    setCurrentPage(0)
  }

  const toggleMode = (mode: ModeTypes) => {
    setMode(currentMode => (currentMode === mode ? undefined : mode))
  }

  const handleSave = () => {
    filterAttributesStore.saveEnum(selectedVariants, mode)
  }

  const handleSearchChange = (value: string) => {
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
          onChange={handleSearchChange}
          isSubgroupItemSearch
        />
      </div>

      <div className="flex justify-end mt-2 -mb-4">
        <AllNotMods
          groupSubKind={attributeSubKind}
          isAllModeChecked={mode === ModeTypes.All}
          isNotModeChecked={mode === ModeTypes.Not}
          isAllModeDisabled={selectedVariants.length < 2}
          isNotModeDisabled={selectedVariants.length === 0}
          toggleAllMode={() => toggleMode(ModeTypes.All)}
          toggleNotMode={() => toggleMode(ModeTypes.Not)}
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
            initialEnumVariants
              ? t('dtree.saveChanges')
              : t('dtree.addAttribute')
          }
          onClick={handleSave}
          disabled={isBlockAddBtn}
        />
      </div>
    </div>
  )
})
