import { ReactElement, useEffect, useState } from 'react'
import { Option } from 'react-dropdown'
import { Form, FormikProps } from 'formik'

import datasetStore from '@store/dataset'
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
  const [variants, setVariants] = useState([])

  const fetchStatFuncAsync = async (
    param?: Record<string, string | string[]>,
  ) => {
    const statFuncData = await datasetStore.fetchStatFuncAsync(
      'Compound_Het',
      param || {},
    )

    setFieldValue(
      'variants',
      statFuncData.variants?.map(
        (variant: [string, number, number]) => variant[0],
      ),
    )
    setVariants(statFuncData.variants)
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
      <div className="flex items-center mt-4">
        <span className="mr-2 text-18 leading-14px text-black">Approx:</span>

        <DropDown
          value={options[0].value}
          options={options}
          onSelect={onChangeAsync}
        />
      </div>

      <div className="mt-4">
        {variants.map(variant => (
          <div key={variant[0]} className="text-14 leading-14px">
            <span className="text-black">{variant[0]}</span>
            <span className="text-grey-blue ml-1">{`(${variant[1]})`}</span>
          </div>
        ))}
      </div>
    </Form>
  )
}
