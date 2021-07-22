import { ReactElement } from 'react'
import { useHistory } from 'react-router'

import { useParams } from '@core/hooks/use-params'
import { Icon } from '@ui/icon'
import { FilterControl } from './ui/filter-control'

export const FilterHeader = (): ReactElement => {
  const params = useParams()
  const history = useHistory()

  const handleClose = () => history.goBack()

  return (
    <div className="flex flex-wrap justify-between bg-blue-dark pt-7 pr-6 pb-4 pl-6">
      <span className="text-20 text-white font-bold">{params.get('ds')}</span>

      <div className="flex items-center">
        <Icon
          name="Close"
          className="text-white cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <FilterControl />
    </div>
  )
}
