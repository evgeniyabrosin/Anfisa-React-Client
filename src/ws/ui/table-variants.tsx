/* eslint-disable react/jsx-key */
import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { Table } from './table'
import { VariantCell } from './variant-cell'
import { TagsCell } from './tags-cell'
import { HG19Cell } from './hg19-cell'
import { observer } from 'mobx-react-lite'
import datasetStore from '../../store/dataset'
import { ANYType } from '../../..'
import { ProteinChangeCell } from './protein-change-cell'
import { PredicationI, PredictionsCell } from './predictions-cell'
import { GnomadCell } from './gnomad-cell'
import { QualityCell } from './quality-cell'
import { FilterCell } from './filter-cell'
import { Loader } from '../../ui/loader'

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


export const TableVariants = observer((): ReactElement => {
	const columns = useMemo(
		() => [
			{
				Header: 'Variant',
				accessor: 'GeneColored',
				Cell: VariantCell
			},
			{
				Header: 'Tag(s)',
				accessor: 'tags',
				Cell: TagsCell
			},
			{
				Header: 'hg19',
				accessor: (item: ANYType) =>  `${item.Coordinate} ${item.Change}`,
				Cell: HG19Cell
			},
			{
				Header: 'pPos Worst/Canonical',
				accessor: 'Protein Change',
				Cell: ProteinChangeCell
			},
			{
				Header: 'Predictions',
				accessor: (item: ANYType): PredicationI[] => ([{name: 'Polyphen', value: item.Polyphen}, {name: 'SIFT', value: item.SIFT}, {name: 'MUT TASTER', value: item['MUT TASTER']}, {name: 'FATHMM', value: item.FATHMM} ]),
				Cell: PredictionsCell
			},
			{
				Header: 'GNOMAD',
				accessor: (item: ANYType): PredicationI[] => ([{name: 'Overall AF', value: item.gnomAD_Overall_AF}, {name: 'Genome AF', value: item.gnomAD_Genomes_AF}, {name: 'Exome AF', value: item.gnomAD_Exomes_AF}]),
				Cell: GnomadCell
			},
			{
				Header: 'Quality',
				accessor: 'Samples',
				Cell: QualityCell
			},
			{
				Header: 'Filter',
				accessor: 'FT',
				Cell: FilterCell
			},
		],
		[]
	)


	if (datasetStore.isLoadingTabReport) {
		return <Loader />
	}

	return (
		<Styles>
			<Table columns={columns} data={datasetStore.tabReport} />
		</Styles>
	)
})