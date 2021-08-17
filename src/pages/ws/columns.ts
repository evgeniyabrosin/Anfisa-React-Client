import { tableColumnMap } from '@core/table-column-map'
import { CellFilter } from './ui/cell-filter'
import { CellGene } from './ui/cell-gene'
import { CellInSilico } from './ui/cell-in-silico'
import { PredicationI } from './ui/cell-interfaces'
import { CellPopulation } from './ui/cell-population'
import { CellProteinChange } from './ui/cell-protein-change'
import { CellSamples } from './ui/cell-samples'
import { CellTags } from './ui/cell-tags'
import { CellVariant } from './ui/cell-variant'

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
    maxWidth: 150,
  },
]
