import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Pagintaion } from '@components/pagintaion'
import { QueryBuilderSearch } from '@pages/filter/dtree/components/query-builder/query-builder-search'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { SelectedGroupItem } from '@pages/filter/refiner/components/middle-column/selected-group-item'
import { TCondition, TVariant } from '@service-providers/common'
import { DtreeAttributeButtons } from '../../pages/filter/common/attributes/dtree-attribute-buttons'
import { RefinerAttributeButtons } from '../../pages/filter/common/attributes/refiner-attribute-buttons'
import { EnumMods } from './enum-mods'

const variantsPerPage = 12

interface IEnumCondition {
  attributeName: string | undefined
  enumVariants: TVariant[]
  attributeSubKind: string | undefined
  initialEnumVariants: string[] | undefined
  initialEnumMode: ModeTypes | undefined
  initialCondition?: TCondition | undefined
  currentStepGroups?: string[] | undefined
  isRefiner?: boolean
  isFilterTouched?: boolean
  saveEnum: (
    selectedVariants: string[],
    mode: ModeTypes | undefined,
    isRefiner?: boolean,
  ) => void
  addEnum?: (
    action: ActionType,
    mode: ModeTypes | undefined,
    selectedVariants: string[],
  ) => void
}

export const EnumCondition = observer(
  ({
    isRefiner,
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
    isFilterTouched,
    initialCondition,
    currentStepGroups,
    saveEnum,
    addEnum,
  }: IEnumCondition): ReactElement => {
    const [mode, setMode] = useState(initialEnumMode)
    const [selectedVariants, setSelectedVariants] = useState(
      initialEnumVariants ?? [],
    )
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

    const isBlockAddBtn = selectedVariants.length === 0 || !isFilterTouched

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
      isRefiner && filterStore.setTouched(true)

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
      isRefiner && filterStore.setTouched(true)
    }

    const handleSearchChange = (value: string) => {
      setSearchValue(value)

      if (currentPage === 0) return
    }

    const selectAllVariants = () => {
      const allVariants = filteredVariants.map(([variantName]) => variantName)

      setSelectedVariants(allVariants)

      isRefiner && filterStore.setTouched(true)
    }

    const clearAllVariants = () => {
      setSelectedVariants([])

      setMode(undefined)
    }

    return (
      <>
        {enumVariants.length > 12 && (
          <div className="flex mt-3">
            <QueryBuilderSearch
              value={searchValue}
              onChange={handleSearchChange}
              isSubgroupItemSearch
            />
          </div>
        )}

        <div className="flex justify-between items-center w-full mt-4 text-14">
          <div className="text-14 text-grey-blue">
            {selectedVariants.length || 0} {t('dtree.selected')}
          </div>

          <div className="flex flex-col">
            <EnumMods
              selectAllVariants={selectAllVariants}
              clearAllVariants={clearAllVariants}
            />

            <div className="flex justify-end mt-1">
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
          </div>
        </div>

        <div className="flex-1 mb-4">
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

        {isRefiner ? (
          <RefinerAttributeButtons
            handleClear={handleClear}
            handleSave={() => saveEnum(selectedVariants, mode, isRefiner)}
            isBlockAddBtn={isBlockAddBtn}
            initialEnumVariants={initialEnumVariants}
          />
        ) : (
          <DtreeAttributeButtons
            initialCondition={initialCondition}
            handleSave={() => saveEnum(selectedVariants, mode)}
            selectedVariants={selectedVariants}
            handleAddAttribute={action =>
              addEnum && addEnum(action, mode, selectedVariants)
            }
            currentStepGroups={currentStepGroups}
          />
        )}
      </>
    )
  },
)
