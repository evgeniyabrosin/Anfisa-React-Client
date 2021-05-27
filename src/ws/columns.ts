import { ANYType } from '@declarations'
import { tableColumnMap } from '../core/table-column-map'
import { FilterCell } from './ui/filter-cell'
import { GnomadCell } from './ui/gnomad-cell'
import { HG19Cell } from './ui/hg19-cell'
import { PredicationI, PredictionsCell } from './ui/predictions-cell'
import { ProteinChangeCell } from './ui/protein-change-cell'
import { QualityCell } from './ui/quality-cell'
import { TagsCell } from './ui/tags-cell'
import { VariantCell } from './ui/variant-cell'

export const variantColumnTable = [
  {
    Header: tableColumnMap.variant,
    accessor: 'GeneColored',
    Cell: VariantCell,
  },
  {
    Header: tableColumnMap.tags,
    accessor: '_tags',
    Cell: TagsCell,
  },
  {
    Header: 'hg19',
    accessor: (item: ANYType) => `${item.Coordinate} ${item.Change}`,
    Cell: HG19Cell,
  },
  {
    Header: tableColumnMap.protein,
    accessor: 'Protein Change',
    Cell: ProteinChangeCell,
  },
  {
    Header: tableColumnMap.predictions,
    accessor: (item: ANYType): PredicationI[] => [
      { name: 'Polyphen', value: item.Polyphen },
      { name: 'SIFT', value: item.SIFT },
      { name: 'MUT TASTER', value: item['MUT TASTER'] },
      { name: 'FATHMM', value: item.FATHMM },
    ],
    Cell: PredictionsCell,
  },
  {
    Header: tableColumnMap.gnomad,
    accessor: (item: ANYType): PredicationI[] => [
      { name: 'Overall AF', value: item.gnomAD_Overall_AF },
      { name: 'Genome AF', value: item.gnomAD_Genomes_AF },
      { name: 'Exome AF', value: item.gnomAD_Exomes_AF },
    ],
    Cell: GnomadCell,
  },
  {
    Header: tableColumnMap.quality,
    accessor: 'Samples',
    Cell: QualityCell,
  },
  {
    Header: tableColumnMap.filter,
    accessor: 'FT',
    Cell: FilterCell,
  },
]
