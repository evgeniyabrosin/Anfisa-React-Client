import { ReactElement, useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import { createChunks } from '@utils/createChunks'
import { QueryBuilderSearch } from './query-builder/query-builder-search'
import { SelectedGroupItem } from './selected-group-item'

export const EnumPanel = observer((): ReactElement => {
  const statList: StatList[] = toJS(datasetStore.dsStat['stat-list']) ?? []

  const currentStatList: StatList | undefined = statList.find(
    (item: any) => item.name === filterStore.selectedGroupItem.name,
  )

  const variants = currentStatList?.variants ?? []

  const [selectedVariants, setSelectedVariants] = useState<[string, number][]>(
    [],
  )

  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const filteredVariants = variants.filter((variant: any[]) =>
    variant[0].toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  )

  const groupsPerPage = 12
  const chunks = createChunks(filteredVariants, groupsPerPage)

  const handleCheckGroupItem = (
    checked: boolean,
    variant: [string, number],
  ) => {
    if (checked) {
      const localVariantNameList = [...selectedVariants, variant]

      setSelectedVariants(localVariantNameList)
    } else {
      const localVariantNameList = selectedVariants.filter(
        element => element[0] !== variant[0],
      )

      setSelectedVariants(localVariantNameList)
    }
  }

  const group = filterStore.selectedGroupItem.vgroup
  const groupItemName: string = filterStore.selectedGroupItem.name

  useEffect(() => {
    setSearchValue('')
    setCurrentPage(0)
  }, [groupItemName])

  const [shouldClear, setShouldClear] = useState(false)

  const handleClear = () => {
    const localSelectedFilters = cloneDeep(filterStore.selectedFilters)

    if (localSelectedFilters[group]?.[groupItemName]) {
      delete localSelectedFilters[group][groupItemName]

      if (datasetStore.activePreset) datasetStore.resetActivePreset()
    }

    filterStore.setSelectedFilters(localSelectedFilters)

    datasetStore.removeConditionGroup({ subGroup: groupItemName })

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }

    setCurrentPage(0)
    setShouldClear(true)
  }

  const handleAddConditions = () => {
    if (selectedVariants.length === 0) return

    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    const nameVariantList = selectedVariants.map(element => element[0])

    datasetStore.setConditionsAsync([
      [
        FilterKindEnum.Enum,
        filterStore.selectedGroupItem.name,
        'OR',
        nameVariantList,
      ],
    ])
    setCurrentPage(0)

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }

    const localSelectedFilters = cloneDeep(filterStore.selectedFilters)

    if (!localSelectedFilters[group]) {
      localSelectedFilters[group] = {}
    }

    if (!localSelectedFilters[group][groupItemName]) {
      localSelectedFilters[group][groupItemName] = {}
    }

    const selectedSubAttributes: any = {}

    selectedVariants.forEach(element => {
      selectedSubAttributes[element[0]] = element[1]
    })
    localSelectedFilters[group][groupItemName] = selectedSubAttributes

    filterStore.setSelectedFilters(localSelectedFilters)
    setSelectedVariants([])
  }

  const handleChange = (value: string) => {
    setSearchValue(value)

    if (currentPage === 0) return

    setCurrentPage(0)
  }

  const { conditions } = datasetStore

  const currentCondition: any[] | undefined = conditions.find(
    (element: any[]) => element[1] === groupItemName,
  )

  const attributeList: string[] | undefined = currentCondition?.[3]

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

      <div className="mt-4">
        <div className="flex-1 mt-4 overflow-y-auto">
          {chunks[currentPage] ? (
            chunks[currentPage].map((variant: [string, number]) => {
              const isAdded = Boolean(attributeList?.includes(variant[0]))

              return (
                variant[1] !== 0 && (
                  <SelectedGroupItem
                    key={variant[0]}
                    setShouldClear={setShouldClear}
                    shouldClear={shouldClear}
                    isAdded={isAdded}
                    variant={variant}
                    handleCheckGroupItem={handleCheckGroupItem}
                  />
                )
              )
            })
          ) : (
            <div className="flex justify-center items-center text-14 text-grey-blue">
              {t('dtree.noFilters')}
            </div>
          )}
        </div>
      </div>

      {filteredVariants.length > groupsPerPage && (
        <Pagintaion
          pagesNumbers={chunks.length}
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
