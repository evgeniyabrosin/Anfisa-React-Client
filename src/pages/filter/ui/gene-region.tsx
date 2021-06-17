import { Form, FormikProps } from 'formik'

import { Input } from '@ui//input'

type Props = FormikProps<any>

export const GeneRegion = ({ values, setFieldValue }: Props) => {
  return (
    <Form>
      <div className="mt-4">
        <span className="text-14 leading-16px text-grey-blue font-bold">
          Locus
        </span>

        <Input
          value={values.locus}
          onChange={e => {
            setFieldValue('locus', e.target.value)
          }}
        />
      </div>
    </Form>
  )
}
