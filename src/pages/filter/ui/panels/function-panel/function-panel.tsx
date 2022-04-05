import { Fragment, FunctionComponent, ReactElement } from 'react'

import filterStore from '@store/filter'
import { CompundHet } from './components/compound-het/compound-het'
import { CompoundRequest } from './components/compound-request/compound-request'
import { CustomInheritanceMode } from './components/custom-inheritance-mode/custom-inheritance-mode'
import { GeneRegion } from './components/gene-region/gene-region'
import { InheritanceMode } from './components/inheritance-mode/inheritance-mode'

const functionsMap: Record<string, any> = {
  GeneRegion,
  Inheritance_Mode: InheritanceMode,
  Custom_Inheritance_Mode: CustomInheritanceMode,
  Compound_Het: CompundHet,
  Compound_Request: CompoundRequest,
}

export const FunctionPanel = (): ReactElement => {
  const selectedFilter = filterStore.selectedGroupItem

  const Component: FunctionComponent<Record<string, any>> =
    functionsMap[selectedFilter.name]

  if (!Component) {
    return <Fragment />
  }

  return <Component />
}
