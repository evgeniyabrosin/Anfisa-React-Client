import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '../../i18n'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { DatasetsFieldsList } from './dataset-fileds-list'

const Root = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const DatasetInfo = (): ReactElement => {
  return (
    <Root>
      <Text>{t('home.info')}</Text>

      <DatasetsFieldsList />
    </Root>
  )
}
