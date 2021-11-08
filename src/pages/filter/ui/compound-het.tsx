import { ReactElement, useEffect, useState } from 'react'
import { Option } from 'react-dropdown'
import { Form, FormikProps } from 'formik'

import { IStatFuncData } from '@declarations'
import filterStore from '@store/filter'
import { DropDown } from '@ui/dropdown'

type Props = FormikProps<{
  variants: string[]
  approx: string | null
  state: string | null
}>

const options = [
  { label: 'shared transcript', value: '' },
  { label: 'shared gene', value: 'gene' },
  { label: 'non-intersecting transcripts', value: 'rough' },
]

export const CompundHet = ({ setFieldValue }: Props): ReactElement => {
  const [statFuncStatus, setStatFuncStatus] = useState<IStatFuncData>()

  const fetchStatFuncAsync = async (
    param?: Record<string, string | string[]>,
  ) => {
    const statFuncData = await filterStore.fetchStatFuncAsync(
      'Compound_Het',
      param || {},
    )

    const nameList = statFuncData.variants?.map(variant => variant?.[0])

    setFieldValue('variants', nameList)

    setStatFuncStatus(statFuncData)
  }

  useEffect(() => {
    const initAsync = async () => {
      await fetchStatFuncAsync({ approx: options[0].value })
    }

    initAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeAsync = async (arg: Option) => {
    setFieldValue('approx', arg.value)
    await fetchStatFuncAsync({ approx: arg.value, state: '' })
  }

  return (
    <Form>
      <div className="text-red-secondary">{statFuncStatus?.err}</div>
      <div className="flex items-center mt-4">
        <span className="mr-2 text-18 leading-14px">Approx:</span>

        <DropDown
          value={options[0].value}
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
  )
}
