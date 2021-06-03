import { ReactElement, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { getFilterFuncParams } from '@core/get-filter-func-params'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Text } from '@ui/text'

export const FunctionPanel = observer(
  (): ReactElement => {
    const [values, setValues] = useState<Record<string, string>>({})
    const [error, setError] = useState('')
    const selectedFilter = filterStore.selectedGroupItem

    return (
      <div>
        <Text style={{ color: 'red' }}>{error}</Text>
        {getFilterFuncParams(selectedFilter.name).map(param => (
          <div key={param}>
            <Text>{param}</Text>
            <Input
              value={values[param] || ''}
              onChange={e => {
                setValues(prev => ({ ...prev, [param]: e.target.value }))
              }}
            />
          </div>
        ))}

        <Button
          text="Add"
          onClick={async () => {
            const { err } = await datasetStore.fetchStatFuncAsync(
              selectedFilter.name,
              values,
            )

            if (err) {
              setError(err)

              return
            } else {
              setError('')
            }

            datasetStore.addConditions([
              ['func', selectedFilter.name, '', ['True'], values],
            ])
          }}
        />
      </div>
    )
  },
)
