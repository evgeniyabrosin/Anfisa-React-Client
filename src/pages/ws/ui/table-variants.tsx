import { MutableRefObject, ReactElement, useRef } from 'react'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { theme } from '@theme'
import datasetStore from '@store/dataset'
import columnsStore from '@store/wsColumns'
import { Loader } from '@ui/loader'
import { NoResultsFound } from '@ui/no-results-found'
import { variantColumnTable } from '../columns'
import { Table } from './table'

const Styles = styled.div`
  overflow-x: auto;

  table {
    border-spacing: 0;
    border-collapse: collapse;
    min-width: 100%;

    thead {
      tr {
        border-color: ${theme('colors.grey.light')};

        th {
          padding: 12px 16px;
          text-align: left;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
          color: ${theme('colors.blue.dark')};
        }
      }
    }

    tbody {
      tr {
        border-top: 1px;
        border-bottom: 1px;
        border-style: solid;
        border-color: ${theme('colors.grey.light')};
      }
    }
  }
`

export const TableVariants = observer(
  (): ReactElement => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>

    const columns = columnsStore.selectedColumns.map(column =>
      variantColumnTable.find(item => item.Header === column),
    )

    const handleScroll = debounce(async () => {
      if (
        datasetStore.filteredNo.length > 0 &&
        datasetStore.indexFilteredNo < datasetStore.filteredNo.length
      ) {
        await datasetStore.fetchFilteredTabReportAsync()

        return
      }

      const scrollLeft: number =
        wrapperRef.current.scrollHeight -
        wrapperRef.current.clientHeight -
        wrapperRef.current.scrollTop

      if (scrollLeft < 200 && datasetStore.filteredNo.length === 0) {
        await datasetStore.fetchTabReportAsync()
      }
    }, 200)

    if (datasetStore.isLoadingTabReport) return <Loader />

    return (
      <Styles ref={wrapperRef} className="flex-1" onScroll={handleScroll}>
        <Table columns={columns} data={datasetStore.tabReport} />

        {datasetStore.tabReport.length === 0 && <NoResultsFound />}

        <div className="h-24 w-full">
          {datasetStore.isFetchingMore && <Loader />}
        </div>
      </Styles>
    )
  },
)
