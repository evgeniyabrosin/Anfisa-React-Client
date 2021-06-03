import { Form, FormikProps } from 'formik'

import { Input } from '@ui//input'

type Props = FormikProps<any>

export const GeneRegion = ({ values, setFieldValue }: Props) => {
  return (
    <Form>
      <span>Gene Region</span>

      <Input
        value={values.locus}
        onChange={e => {
          setFieldValue('locus', e.target.value)
        }}
      />
    </Form>
  )
}
