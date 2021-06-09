import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { theme } from '@theme'
import datasetStore from '@store/dataset'
import { Loader } from '@ui/loader'
import { NoResultsFound } from '@ui/no-results-found'
import { variantColumnTable } from '../columns'
import { Table } from './table'

const Styles = styled.div`
  table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;

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

        td {
          padding: 20px 16px;
        }
      }
    }
  }
`

export const TableVariants = observer(
  (): ReactElement => {
    const columns = datasetStore.selectedColumns.map(column =>
      variantColumnTable.find(item => item.Header === column),
    )

    if (datasetStore.isLoadingTabReport) {
      return <Loader />
    }

    return (
      <Styles>
        <Table columns={columns} data={datasetStore.tabReport} />

        {datasetStore.tabReport.length === 0 && <NoResultsFound />}

        <div className="h-24 w-full">
          {datasetStore.isFetchingMore && <Loader />}
        </div>
      </Styles>
    )
  },
)
