import debounce from 'lodash/debounce'
import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from '../core/hooks/use-params'
import dsStore from '../store/dataset'
import { Box } from '../ui/box'
import { ControlPanel } from './ui/control-panel'
import { TableVariants } from './ui/table-variants'
import { WsHeader } from './ws.header'

const Root = styled(Box)`
  padding: 38px 20px 0px 30px;
`

export const WSPage = (): ReactElement => {
  const params = useParams()

  useEffect(() => {
    dsStore.resetData()

    const initAsync = async () => {
      await dsStore.fetchDsStatAsync(params.get('ds'))
      await dsStore.fetchTabReportAsync(params.get('ds'))
    }

    dsStore.fetchWsListAsync(params.get('ds'))
    dsStore.fetchReccntAsync(params.get('ds'))
    dsStore.fetchWsTagsAsync(params.get('ds'))

    initAsync()
  }, [params])

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >
      document.body.clientHeight - 100
    ) {
      dsStore.fetchTabReportAsync(params.get('ds'))
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
}
