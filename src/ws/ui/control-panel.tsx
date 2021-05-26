import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import datasetStore from '@store/dataset'
import { Box } from '../../ui/box'
import { Tags } from '../../ui/tags'
import { Filters } from './filters'
import { Preset } from './preset'
import { Settings } from './settings'

const Root = styled(Box)`
  display: flex;
  margin-top: 22px;
  margin-bottom: 60px;
`

export const ControlPanel = observer(
  (): ReactElement => {
    return (
      <Root>
        <Preset />

        <Filters />

        <Tags tags={datasetStore.selectedTags} />

        <Settings />
      </Root>
    )
  },
)
