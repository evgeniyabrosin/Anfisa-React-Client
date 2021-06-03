import { ReactElement, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import dsStore from '@store/dataset'
import { Header } from '@ui/header'
import { ControlPanel } from './ui/control-panel'
import { TableVariants } from './ui/table-variants'

export const WSPage = observer(
  (): ReactElement => {
    const params = useParams()

    useEffect(() => {
      const dsName = params.get('ds') || ''

      dsStore.initDatasetAsync(dsName)
    }, [params])

    const handleScroll = debounce(async () => {
      if (
        dsStore.filteredNo.length > 0 &&
        dsStore.indexFilteredNo < dsStore.filteredNo.length
      ) {
        await dsStore.fetchFilteredTabReportAsync()

        return
      }

      if (
        window.innerHeight + window.scrollY >
          document.body.clientHeight - 100 &&
        dsStore.filteredNo.length === 0
      ) {
        await dsStore.fetchTabReportAsync()
      }
    }, 200)

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div>
        <Header />
        <ControlPanel />
        <TableVariants />
      </div>
    )
  },
)
