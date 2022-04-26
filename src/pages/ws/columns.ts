import { tableColumnMap } from '@core/table-column-map'
import { CellInSilico } from './ui//table/cell-in-silico'
import { PredicationI } from './ui//table/cell-interfaces'
import { CellPopulation } from './ui//table/cell-population'
import { CellProteinChange } from './ui//table/cell-protein-change'
import { CellSamples } from './ui//table/cell-samples'
import { CellTags } from './ui//table/cell-tags'
import { CellVariant } from './ui//table/cell-variant'
import { CellFilter } from './ui/table/cell-filter'
import { CellGene } from './ui/table/cell-gene'

export const variantColumnTable = [
  {
    Header: tableColumnMap.gene,
    accessor: 'GeneColored',
    Cell: CellGene,
  },
  {
    Header: tableColumnMap.variant,
    accessor: (item: any) => `${item.Coordinate} ${item.Change}`,
    Cell: CellVariant,
  },
  {
    Header: tableColumnMap.tags,
    accessor: '_tags',
    Cell: CellTags,
    minWidth: 224,
  },
  {
    Header: tableColumnMap.proteinChange,
    accessor: 'Protein Change',
    Cell: CellProteinChange,
  },
  {
    Header: tableColumnMap.inSilico,
    accessor: (item: any): PredicationI[] => [
      { name: 'Polyphen', value: item.Polyphen },
      { name: 'SIFT', value: item.SIFT },
      { name: 'MUT TASTER', value: item['MUT TASTER'] },
      { name: 'FATHMM', value: item.FATHMM },
    ],
    Cell: CellInSilico,
  },
  {
    Header: tableColumnMap.population,
    accessor: (item: any): PredicationI[] => [
      { name: 'Overall AF', value: item.gnomAD_Overall_AF },
      { name: 'Genome AF', value: item.gnomAD_Genomes_AF },
      { name: 'Exome AF', value: item.gnomAD_Exomes_AF },
    ],
    Cell: CellPopulation,
  },
  {
    Header: tableColumnMap.samples,
    accessor: 'Samples',
    Cell: CellSamples,
    minWidth: 270,
  },
  {
    Header: tableColumnMap.filter,
    accessor: 'FT',
    Cell: CellFilter,
  },
]
