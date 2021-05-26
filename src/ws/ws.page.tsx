import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'
import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from '../core/hooks/use-params'
import dsStore from '../store/dataset'
import dirinfoStore from '../store/dirinfo'
import { Box } from '../ui/box'
import { ControlPanel } from './ui/control-panel'
import { TableVariants } from './ui/table-variants'
import { WsHeader } from './ws.header'

const Root = styled(Box)`
  padding: 38px 20px 0px 30px;
`

export const WSPage = observer(
  (): ReactElement => {
    const params = useParams()

    useEffect(() => {
      const dsName = params.get('ds') || ''

      dsStore.initDatasetAsync(dsName)
      dirinfoStore.fetchDsinfoAsync(dsName)
    }, [params])

    const handleScroll = debounce(() => {
      if (
        dsStore.filteredNo.length > 0 &&
        dsStore.indexFilteredNo < dsStore.filteredNo.length
      ) {
        dsStore.fetchFilteredTabReportAsync()

        return
      }

      if (
        window.innerHeight + window.scrollY >
          document.body.clientHeight - 100 &&
        dsStore.filteredNo.length === 0
      ) {
        dsStore.fetchTabReportAsync()
      }
    }, 200)

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Root>
        <WsHeader />
        <ControlPanel />
        <TableVariants />
      </Root>
    )
  },
)
