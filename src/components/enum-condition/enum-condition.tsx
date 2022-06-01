import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Divider } from '@ui/divider'
import { Switch } from '@ui/switch'
import { Pagintaion } from '@components/pagintaion'
import { DtreeAttributeButtons } from '@pages/filter/common/attributes/dtree-attribute-buttons'
import { RefinerAttributeButtons } from '@pages/filter/common/attributes/refiner-attribute-buttons'
import { QueryBuilderSearch } from '@pages/filter/dtree/components/query-builder/query-builder-search'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { AttributeHeader } from '@pages/filter/refiner/components/middle-column/attribute-header'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { SelectedGroupItem } from '@pages/filter/refiner/components/middle-column/selected-group-item'
import { TCondition, TVariant } from '@service-providers/common'
import { EnumMods } from './enum-mods'

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
  isShowZeroes?: boolean
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
  toggleShowZeroes: (value: boolean) => void
}

const initialCount = 8

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
    isShowZeroes,
    saveEnum,
    addEnum,
    toggleShowZeroes,
  }: IEnumCondition): ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

    const [mode, setMode] = useState(initialEnumMode)
    const [selectedVariants, setSelectedVariants] = useState(
      initialEnumVariants ?? [],
    )
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [variantsPerPage, setVariantsPerPage] = useState<number>(initialCount)

    const isBlockAddBtn = !selectedVariants.length || !isFilterTouched

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

          const newCount = height / heightOfElement
          if (newCount !== variantsPerPage && newCount > initialCount) {
            setVariantsPerPage(newCount)
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
        {isRefiner && (
          <>
            <AttributeHeader
              chosenAttributes={selectedVariants.length}
              allAttributes={enumVariants.length}
              attrStatus={filterStore.selectedAttributeStatus!}
            />

            <DividerHorizontal />
          </>
        )}

        {enumVariants.length > initialCount && (
          <QueryBuilderSearch
            value={searchValue}
            onChange={handleSearchChange}
            isSubgroupItemSearch
            className={cn(isRefiner ? 'mb-4' : 'mt-4')}
          />
        )}

        <div
          className={cn(
            'flex justify-between items-center w-full mb-4 text-14',
            !isRefiner && 'mt-6',
          )}
        >
          <div className="text-14 text-grey-blue grow">
            {selectedVariants.length || 0} {t('dtree.selected')}
          </div>

          <div className="flex items-center">
            <Switch
              className="mr-1"
              isChecked={!!isShowZeroes}
              onChange={toggleShowZeroes}
            />
            <span className="text-grey-blue">
              {t('enumCondition.showZeroVariants')}
            </span>
          </div>

          <Divider orientation="vertical" color="light" />

          <EnumMods
            selectAllVariants={selectAllVariants}
            clearAllVariants={clearAllVariants}
          />
        </div>

        <div
          className="flex flex-1 mb-4 justify-between flex-row-reverse"
          ref={ref}
        >
          <div>
            <AllNotMods
              groupSubKind={attributeSubKind}
              isAllModeChecked={mode === ModeTypes.All}
              isNotModeChecked={mode === ModeTypes.Not}
              isAllModeDisabled={selectedVariants.length < 2}
              isNotModeDisabled={!selectedVariants.length}
              toggleAllMode={() => toggleMode(ModeTypes.All)}
              toggleNotMode={() => toggleMode(ModeTypes.Not)}
            />
          </div>

          <div className="h-full">
            {variantsPage.length > 0 ? (
              variantsPage.map(variant => (
                <SelectedGroupItem
                  key={variant[0]}
                  isSelected={selectedVariants.includes(variant[0])}
                  variant={variant}
                  handleCheckGroupItem={handleCheckGroupItem}
                  className="last:mb-0"
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
