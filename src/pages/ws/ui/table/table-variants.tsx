import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { theme } from '@theme'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import { Loader } from '@components/loader'
import { Table } from './table'

const Styles = styled.div`
  min-width: 380px;
  overflow-x: auto;
  overflow-y: hidden;

  .table {
    border-spacing: 0;
    border-collapse: collapse;

    .thead {
      .th {
        padding: 12px 16px;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
      }
    }

    .tbody {
      .td > div {
        cursor: text;
      }
    }

    .tr {
      border-bottom: 1px;
      border-style: solid;
      border-color: ${theme('colors.grey.light')};
    }
  }
`

interface ITableVariantsProps {
  className?: string
}

export const TableVariants = observer(
  ({ className }: ITableVariantsProps): ReactElement => {
    const isLoaderShown =
      mainTableStore.tabReport.firstPage?.isFetching ||
      mainTableStore.isTableResizing
    const { columnDataListForRender } = columnsStore

    return (
      <Styles className={className}>
        {isLoaderShown ? (
          <Loader />
        ) : (
          <Table
            columns={columnDataListForRender}
            data={mainTableStore.tabReportPagesData}
          />
        )}
      </Styles>
    )
  },
)
