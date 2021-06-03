import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import filterStore from '@store/filter'
import { Box } from '@ui/box'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'
import { FunctionPanel } from './function-panel'
import { SelectedGroupItem } from './selected-group-item'

const Root = styled(Box)`
  background-color: #def1fd;
  padding: 20px 16px;
  width: 436px;
  border-radius: 8px 8px 0px 0px;
`

const Delimiter = styled(Box)`
  background-color: #9fd6f9;
  height: 1px;
  width: 100%;
  margin-top: 16px;
`

const VariantListContainer = styled(Box)`
  margin-top: 16px;
`

const StyledFilterRefinerGroupItem = styled(FilterRefinerGroupItem)<any>`
  padding-left: 0;
`

export const SelectedGroup = observer(
  (): ReactElement => {
    const selectedGroupItem = filterStore.selectedGroupItem

    if (!selectedGroupItem.name) {
      return <Fragment />
    }

    const groupVariantSum = selectedGroupItem.variants
      ? selectedGroupItem.variants.reduce(
          (prev: number, cur: [string, number]) => prev + cur[1],
          0,
        )
      : 0

    const handleSelect = (variant: [string, number], checked: boolean) => {
      if (checked) {
        filterStore.addSelectedFilters({
          group: selectedGroupItem.vgroup,
          groupItemName: selectedGroupItem.name,
          variant,
        })
      } else {
        filterStore.removeSelectedFilters({
          group: selectedGroupItem.vgroup,
          groupItemName: selectedGroupItem.name,
          variant,
        })
      }
    }

    return (
      <Root>
        <StyledFilterRefinerGroupItem
          {...selectedGroupItem}
          amount={groupVariantSum}
          onChange={() => filterStore.setSelectedGroupItem({})}
        />
        <Delimiter />

        {selectedGroupItem.kind === FilterKindEnum.enum && (
          <VariantListContainer>
            {selectedGroupItem.variants &&
              selectedGroupItem.variants.map((variant: any) => (
                <SelectedGroupItem
                  key={variant[0]}
                  name={variant[0]}
                  amount={variant[1]}
                  handleSelect={checked => handleSelect(variant, checked)}
                />
              ))}
          </VariantListContainer>
        )}

        {selectedGroupItem.kind === FilterKindEnum.func && <FunctionPanel />}
      </Root>
    )
  },
)
