import { Fragment, useEffect, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { Form, FormikProps } from 'formik'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import datasetStore from '@store/dataset'
import { Box } from '@ui/box'
import { Text } from '@ui/text'

const VariantBox = styled(Box)`
  display: flex;
  align-items: center;
`

const VariantName = styled(Text)`
  margin: 0;
`

const VariantAmount = styled(Text)`
  margin: 0;
`

export const InheritanceMode = observer(
  ({
    values,
    setFieldValue,
  }: FormikProps<{ problemGroups: string[]; variants: string[] }>) => {
    const [variants, setVariants] = useState([])
    const [problemGroups, setProblemGroups] = useState<string[]>([])

    const fetchStatFuncAsync = async (
      param?: Record<string, string | string[]>,
    ) => {
      const statFuncData = await datasetStore.fetchStatFuncAsync(
        'Inheritance_Mode',
        param || {},
      )

      setVariants(
        statFuncData.variants.filter((item: [string, number]) => item[1] > 0),
      )
    }

    useEffect(() => {
      const initAsync = async () => {
        const [problemGroupsData] = await Promise.all([
          datasetStore.fetchProblemGroupsAsync(),
          fetchStatFuncAsync(),
        ])

        setProblemGroups(problemGroupsData)
      }

      initAsync()
    }, [])

    return (
      <Form>
        <Text>Problem group</Text>

        {problemGroups.map(problemGroup => (
          <VariantBox key={problemGroup}>
            <Checkbox
              checked={values.problemGroups.includes(problemGroup)}
              onChange={async e => {
                const value = e.target.checked
                  ? [...values.problemGroups, problemGroup]
                  : values.problemGroups.filter(group => group !== problemGroup)

                await fetchStatFuncAsync({
                  problem_group: value,
                })
                setFieldValue('problemGroups', value)
              }}
            />
            <VariantName>{problemGroup}</VariantName>
          </VariantBox>
        ))}

        <Text>Variants</Text>

        {variants.map(variant => {
          if (variant[1] === 0) {
            return <Fragment />
          }

          return (
            <VariantBox key={variant[0]}>
              <Checkbox
                checked={values.variants.includes(variant[0])}
                onChange={e => {
                  const value = e.target.checked
                    ? [...values.variants, variant[0]]
                    : values.variants.filter(item => item !== variant[0])

                  setFieldValue('variants', value)
                }}
              />
              <VariantName>{variant[0]}</VariantName>
              <VariantAmount>{`(${variant[1]})`}</VariantAmount>
            </VariantBox>
          )
        })}
      </Form>
    )
  },
)
