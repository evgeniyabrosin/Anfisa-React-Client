import { ReactElement, useEffect, useState } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { IVariantList, StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import { createChunks } from '@utils/createChunks'
import { SelectedGroupItems } from './selected-group-items'

export const EnumPanel = observer(
  (): ReactElement => {
    const statList: StatList[] = toJS(datasetStore.dsStat['stat-list']) ?? []

    const currentStatList: StatList | undefined = statList.find(
      (item: any) => item.name === filterStore.selectedGroupItem.name,
    )

    const vgroup = filterStore.selectedGroupItem.vgroup
    const groupItemName = filterStore.selectedGroupItem.name

    const variants =
      currentStatList?.variants?.map(
        (variant: any): IVariantList => {
          const variantQuantity =
            filterStore.selectedFilters?.[`${vgroup}`]?.[`${groupItemName}`]?.[
              `${variant[0]}`
            ]

          const isChecked = Boolean(variantQuantity)

          return { variant, isChecked }
        },
      ) ?? []

    const [variantList, setVariantList] = useState(variants)
    const [currentPage, setCurrentPage] = useState(0)

    const groupsPerPage = 20
    const chunks = createChunks(variantList, groupsPerPage)

    const handleSelect = (index: number, checked: boolean) => {
      const localVariantList = [...variantList]

      const currentIndex = currentPage * groupsPerPage + index

      localVariantList[currentIndex].isChecked = checked

      setVariantList(localVariantList)
    }

    const stringedVariants = JSON.stringify(variants)

    useEffect(() => {
      setVariantList(variants)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringedVariants])

    const updateSubattributes = (
      shouldAddSubattributes?: boolean,
    ): string[] => {
      const checkedVariantNames: string[] = []

      variantList.forEach(element => {
        const { variant, isChecked } = element

        if (shouldAddSubattributes && isChecked) {
          filterStore.addSelectedFilters({
            group: filterStore.selectedGroupItem.vgroup,
            groupItemName: filterStore.selectedGroupItem.name,
            variant,
          })

          checkedVariantNames.push(variant[0])
        } else {
          const variantQuantity =
            filterStore.selectedFilters?.[`${vgroup}`]?.[`${groupItemName}`]?.[
              `${variant[0]}`
            ]

          const isVariantChecked = Boolean(variantQuantity)

          if (!isVariantChecked) return

          filterStore.removeSelectedFilters({
            group: filterStore.selectedGroupItem.vgroup,
            groupItemName: filterStore.selectedGroupItem.name,
            variant,
          })

          datasetStore.removeCondition(
            {
              subGroup: filterStore.selectedGroupItem.name,
              itemName: variant[0],
            },
            false,
          )
        }
      })

      return checkedVariantNames
    }

    const handleClear = () => {
      updateSubattributes()
      datasetStore.fetchDsStatAsync()
    }

    const handleAddConditions = () => {
      const variantNameList: string[] = updateSubattributes(true)

      if (variantNameList.length === 0) return

      datasetStore.setConditionsAsync([
        [
          FilterKindEnum.Enum,
          filterStore.selectedGroupItem.name,
          'OR',
          variantNameList,
        ],
      ])

      setCurrentPage(0)
    }

    const isBlockAddBtn = !variantList.some(element => element.isChecked)

    return (
      <div>
        <SelectedGroupItems
          subattributeList={chunks[currentPage]}
          handleSelect={handleSelect}
        />

        {variantList.length > groupsPerPage && (
          <Pagintaion
            pagesNumbers={chunks.length}
            currentPage={currentPage}
            setPageNumber={setCurrentPage}
          />
        )}
        <div className="flex items-center justify-between mt-1 pb-2">
          <Button
            variant={'secondary'}
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
  },
)
