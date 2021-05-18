import { observer } from 'mobx-react-lite'
import { Fragment, ReactElement } from 'react'
import styled from 'styled-components'

import { ANYType } from '../../..'
import filterStore from '../../store/filter'
import { Box } from '../../ui/box'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'
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

const StyledFilterRefinerGroupItem = styled(FilterRefinerGroupItem)<ANYType>`
  padding-left: 0;
`

export const SelectedGroup = observer(
  (): ReactElement => {
    const selectedGroupItem = filterStore.selectedGroupItem

    if (!selectedGroupItem.name) {
      return <Fragment />
    }

    return (
      <Root>
        <StyledFilterRefinerGroupItem
          {...selectedGroupItem}
          onChange={() => filterStore.setSelectedGroupItem({})}
        />
        <Delimiter />

        <VariantListContainer>
          {selectedGroupItem.variants &&
            selectedGroupItem.variants.map((variant: ANYType) => (
              <SelectedGroupItem
                key={variant[0]}
                name={variant[0]}
                amount={variant[1]}
              />
            ))}
        </VariantListContainer>
      </Root>
    )
  },
)
