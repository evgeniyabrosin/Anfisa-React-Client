import { Fragment, ReactElement, useMemo } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'
import { getNumericExpression } from '@utils/getNumericExpression'
import { AllNotModeView } from './all-not-mode-view'

interface Props {
  title: string
  filters: Record<string, number>
  onRemove: (name: string) => void
}

export const SelectedFilterCard = observer(
  ({ title, filters, onRemove }: Props): ReactElement => {
    const [isOpen, open, close] = useToggle(true)

    const filterContentWithoutModes = useMemo(() => {
      return Object.entries(filters).filter(
        filter => filter[0] !== 'All' && filter[0] !== 'Not',
      )
    }, [filters])

    if (filterContentWithoutModes.length === 0) {
      return <Fragment />
    }

    const getSelectedFilter = (
      filterName: string,
      filterExp: number | any[],
    ) => {
      return typeof filterExp === 'number'
        ? filterName
        : getNumericExpression(filterExp, filterName)
    }

    const isAllMode: boolean = useMemo(() => {
      return Object.keys(filters).includes('All')
    }, [filters])

    const isNotMode: boolean = useMemo(() => {
      return Object.keys(filters).includes('Not')
    }, [filters])

    return (
      <div>
        <div
          className="flex items-center border-b border-grey-light p-4 cursor-pointer"
          onClick={isOpen ? close : open}
        >
          <span className="leading-16px">{title}</span>
          <AllNotModeView isAllMode={isAllMode} isNotMode={isNotMode} />

          <Icon
            name="Arrow"
            className={cn(
              'text-blue-bright ml-auto transform transition-transform',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          />
        </div>

        {isOpen && (
          <div>
            {filterContentWithoutModes.map(([filterName, filterExpression]) => (
              <div
                key={filterName + filterExpression}
                className="flex items-center pl-6 py-4"
              >
                <Checkbox checked onChange={() => onRemove(filterName)} />
                <span className="text-14 leading-16px font-bold ml-2">
                  {getSelectedFilter(filterName, filterExpression)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)
