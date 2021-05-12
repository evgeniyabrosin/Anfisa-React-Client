/* eslint-disable react/jsx-key */
import { observer } from 'mobx-react-lite'
import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'

import { ANYType } from '../../..'
import datasetStore from '../../store/dataset'
import variantStore from '../../store/variant'
import { Loader } from '../../ui/loader'
import { variantColumnTable } from '../columns'
import { FilterCell } from './filter-cell'
import { GnomadCell } from './gnomad-cell'
import { HG19Cell } from './hg19-cell'
import { PredicationI, PredictionsCell } from './predictions-cell'
import { ProteinChangeCell } from './protein-change-cell'
import { QualityCell } from './quality-cell'
import { Table } from './table'
import { TagsCell } from './tags-cell'
import { VariantCell } from './variant-cell'

const Styles = styled.div`
  table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;

    thead {
      padding: 17px 33px;

      tr {
        th {
          padding-top: 17px;
          padding-bottom: 17px;
          text-align: left;
          font-family: 'Roboto', sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
          color: #000000;

          :first-child {
            padding-left: 33px;
          }
        }
      }
    }

    tbody {
      tr {
        border: 1px solid #e3e5e6;
        padding: 10px 60px 10px 30px;

        td {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
`

export const TableVariants = observer(
  (): ReactElement => {
    const columns = variantColumnTable.filter(item =>
      variantStore.columns.includes(item.Header),
    )

    if (datasetStore.isLoadingTabReport) {
      return <Loader />
    }

    return (
      <Styles>
        <Table columns={columns} data={datasetStore.tabReport} />
      </Styles>
    )
  },
)
