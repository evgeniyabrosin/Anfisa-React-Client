import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import { QueryBuilderSearch } from '@pages/filter/dtree/components/query-builder/query-builder-search'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { AttributeHeader } from '@pages/filter/refiner/components/middle-column/attribute-header'
import { TVariant } from '@service-providers/common'
import { SelectedGroupItem } from '../selected-group-item'
import filterAttributesStore from './current-filter.store'

export const EnumPanel = observer((): ReactElement => {
  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = filterAttributesStore

  const { selectedAttributeStatus, isFilterTouched } = filterStore

  const ref = useRef<HTMLDivElement>(null)

  const [mode, setMode] = useState(initialEnumMode)
  const [selectedVariants, setSelectedVariants] = useState(
    initialEnumVariants ?? [],
  )
  const [variantsPerPage, setVariantsPerPage] = useState<number>(12)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setSearchValue('')
    setCurrentPage(0)
  }, [attributeName])

  useEffect(
    () => {
      const element = ref.current as Element

      if (!element) return

      const observer = new ResizeObserver(entries => {
        const { height } = entries[0].contentRect
        const heightOfElement = 32

        if (height / heightOfElement !== variantsPerPage) {
          setVariantsPerPage(height / 32)
        }
      })
      observer.observe(element)

      return () => {
        observer.unobserve(element)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current],
  )

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
    filterStore.setTouched(true)

    if (checked) {
      setSelectedVariants([...selectedVariants, variantName])
      return
    }

    setSelectedVariants(
      selectedVariants.filter(element => element !== variantName),
    )
  }

  const handleClear = () => {
    setSelectedVariants([])
    setMode(undefined)
    setCurrentPage(0)
  }

  const toggleMode = (mode: ModeTypes) => {
    setMode(currentMode => (currentMode === mode ? undefined : mode))
    filterStore.setTouched(true)
  }

  const handleSave = () => {
    filterAttributesStore.saveEnum(selectedVariants, mode)
    filterStore.setTouched(false)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)

    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }

  const isBlockAddBtn = selectedVariants.length === 0 || !isFilterTouched

  return (
    <>
      <AttributeHeader
        chosenAttributes={selectedVariants.length}
        allAttributes={enumVariants.length}
        attrStatus={selectedAttributeStatus!}
      />

      <div className="bg-grey-light h-px w-full my-4" />

      <QueryBuilderSearch
        value={searchValue}
        onChange={handleSearchChange}
        isSubgroupItemSearch
      />

      <AllNotMods
        groupSubKind={attributeSubKind}
        isAllModeChecked={mode === ModeTypes.All}
        isNotModeChecked={mode === ModeTypes.Not}
        isAllModeDisabled={selectedVariants.length < 2}
        isNotModeDisabled={!selectedVariants.length}
        toggleAllMode={() => toggleMode(ModeTypes.All)}
        toggleNotMode={() => toggleMode(ModeTypes.Not)}
        classname="flex justify-end mt-4 mb-[-37px]"
      />

      <div className="flex-1 mt-4 overflow-y-auto" ref={ref}>
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

      {pagesCount > 1 && (
        <Pagintaion
          pagesNumbers={pagesCount}
          currentPage={currentPage}
          setPageNumber={setCurrentPage}
        />
      )}
      <div className="flex items-center justify-end mt-2 pb-[40px]">
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
    </>
  )
})
