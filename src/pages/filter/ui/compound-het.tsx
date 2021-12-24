import { ReactElement, useEffect, useState } from 'react'
import { Option } from 'react-dropdown'
import { Form, FormikProps } from 'formik'

import { IStatFuncData } from '@declarations'
import { SessionStoreManager } from '@core/session-store-manager'
import filterStore from '@store/filter'
import { DropDown } from '@ui/dropdown'
import { SessionStoreDataProvider } from '../../../components/session-store-data-provider'
import { FILTER_REFINER_PREFIX } from './filter-refiner'

export interface ICompoundHetFormValues {
  variants: string[]
  approx: string | null
  state?: string | null
}

const COMPOUND_HET = 'Compound_Het'

const options = [
  { label: 'shared transcript', value: '' },
  { label: 'shared gene', value: 'gene' },
  { label: 'non-intersecting transcripts', value: 'rough' },
]

const getSavedValues = () => {
  return SessionStoreManager.read<ICompoundHetFormValues>(
    COMPOUND_HET,
    FILTER_REFINER_PREFIX,
  )
}

export const CompundHet = ({
  setFieldValue,
  values: { approx, variants },
}: FormikProps<ICompoundHetFormValues>): ReactElement => {
  const [statFuncStatus, setStatFuncStatus] = useState<IStatFuncData>()

  const initialApprox = getSavedValues()?.approx || options[0].value

  const fetchStatFuncAsync = async (
    param?: Record<string, string | string[]>,
  ) => {
    const statFuncData = await filterStore.fetchStatFuncAsync(
      COMPOUND_HET,
      JSON.stringify(param) || {},
    )

    const nameList = statFuncData.variants?.map(variant => variant?.[0])

    setFieldValue('variants', nameList || getSavedValues()?.variants)

    setStatFuncStatus(statFuncData)
  }

  useEffect(() => {
    fetchStatFuncAsync({ approx: initialApprox })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeAsync = async (arg: Option) => {
    setFieldValue('approx', arg.value)
    await fetchStatFuncAsync({ approx: arg.value, state: '' })
  }

  return (
    <SessionStoreDataProvider<ICompoundHetFormValues>
      storeKey={COMPOUND_HET}
      values={{
        variants,
        approx,
      }}
      storePrefix={FILTER_REFINER_PREFIX}
    >
      <Form>
        <div className="text-red-secondary">{statFuncStatus?.err}</div>
        <div className="flex items-center mt-4">
          <span className="mr-2 text-18 leading-14px">Approx:</span>

          <DropDown
            value={initialApprox}
            options={options}
            onSelect={onChangeAsync}
          />
        </div>

        <div className="mt-4">
          {statFuncStatus?.variants?.map(variant => (
            <div key={variant[0]} className="text-14 leading-14px">
              <span>{variant[0]}</span>
              <span className="text-grey-blue ml-1">{`(${variant[1]})`}</span>
            </div>
          ))}
        </div>
      </Form>
    </SessionStoreDataProvider>
  )
}
