/* eslint-disable react/jsx-key */
import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { Table } from './table'
import { fakeTableData } from '../fake.data'
import { VariantCell } from './variant-cell'
import { TagsCell } from './tags-cell'
import { HG19Cell } from './hg19-cell'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border-collapse: collapse;

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
            border: 1px solid #E3E5E6;
            padding: 10px 60px 10px 30px;

            td {
                margin: 0;
                padding: 0;
            }
        }
    }
  }
`


export const TableVariants = (): ReactElement => {
	const columns = useMemo(
		() => [
			{
				Header: 'Variant',
				accessor: 'variant',
				Cell: VariantCell
			},
			{
				Header: 'Tag(s)',
				accessor: 'tags',
				Cell: TagsCell
			},
			{
				Header: 'hg19',
				accessor: 'hg19',
				Cell: HG19Cell
			},
			{
				Header: 'pPos Worst/Canonical',
				accessor: 'pPos'
			},
			{
				Header: 'Predictions',
				accessor: 'predictions'
			},
			{
				Header: 'GNOMAD',
				accessor: 'GNOMAD'
			},
			{
				Header: 'Quality',
				accessor: 'quality'
			},
			{
				Header: 'Filter',
				accessor: 'filter'
			},
		],
		[]
	)

	return (
		<Styles>
			<Table columns={columns} data={fakeTableData} />
		</Styles>
	)
}
