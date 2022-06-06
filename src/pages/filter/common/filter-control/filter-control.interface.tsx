import { FilterControlOptionsNames } from './filter-control.const'

export interface IFilterControlProps {
  SolutionControl: React.ElementType
  TextEditorButton?: React.ElementType
  isForwardAllowed: boolean
  isBackwardAllowed: boolean
  pageName: FilterControlOptionsNames
  goForward: () => void
  goBackward: () => void
  className?: string
}
