import { ReactElement } from 'react'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import {
  ICompoundHetArgs,
  ICompoundRequestArgs,
  ICustomInheritanceModeArgs,
  IGeneRegionArgs,
  IInheritanceModeArgs,
  TFuncArgs,
} from '@service-providers/common/common.interface'
import { CompoundHetView } from './components/compound-het-view'
import { CompoundRequestView } from './components/compound-request-view'
import { CustomInheritanceModeView } from './components/custom-inheritance-mode-view'
import { GeneRegionView } from './components/gene-region-view'
import { InheritanceModeView } from './components/inheritance-mode-view'

interface IFuncFilterProps {
  filterId: string
  filterName: string
  isFilterActive: boolean
  filterContent: string[]
  filterExpression: TFuncArgs
}

export const FuncFilter = ({
  filterId,
  filterName,
  isFilterActive,
  filterContent,
  filterExpression,
}: IFuncFilterProps): ReactElement => (
  <>
    {filterName === FuncStepTypesEnum.InheritanceMode && (
      <InheritanceModeView
        filterId={filterId}
        isFilterActive={isFilterActive}
        filterContent={filterContent}
        filterExpression={filterExpression as IInheritanceModeArgs}
      />
    )}

    {filterName === FuncStepTypesEnum.CustomInheritanceMode && (
      <CustomInheritanceModeView
        filterId={filterId}
        isFilterActive={isFilterActive}
        filterContent={filterContent}
        filterExpression={filterExpression as ICustomInheritanceModeArgs}
      />
    )}

    {filterName === FuncStepTypesEnum.GeneRegion && (
      <GeneRegionView
        isFilterActive={isFilterActive}
        filterContent={filterContent}
        filterExpression={filterExpression as IGeneRegionArgs}
      />
    )}

    {filterName === FuncStepTypesEnum.CompoundHet && (
      <CompoundHetView
        isFilterActive={isFilterActive}
        filterContent={filterContent}
        filterExpression={filterExpression as ICompoundHetArgs}
      />
    )}

    {filterName === FuncStepTypesEnum.CompoundRequest && (
      <CompoundRequestView
        filterId={filterId}
        isFilterActive={isFilterActive}
        filterContent={filterContent}
        filterExpression={filterExpression as ICompoundRequestArgs}
      />
    )}
  </>
)
