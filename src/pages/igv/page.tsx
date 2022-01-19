import { ReactElement, useEffect, useRef } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { observer } from 'mobx-react-lite'

import { getIgvUrl } from '@core/get-api-url'
import { useParams } from '@core/hooks/use-params'
import { ErrorPage } from '@pages/error/error'

const igv = require('igv')

// TODO: when the design is ready, make an error if the file you need is missing

// TODO: add check if we downloaded this sample...
const IgvPage = observer(
  (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

    const params = useParams()

    const locus = params.get('locus')
    const names = params.get('names')
    const nameList = names?.split(',') ?? []

    const isCorrectParams = locus && names

    useEffect(() => {
      const tracks = nameList.map(name => {
        return {
          name,
          url: getIgvUrl(`bams/GRCh38/${name}.sorted.bam`),
          indexURL: getIgvUrl(`bams/GRCh38/${name}.sorted.bam.bai`),
          format: 'bam',
        }
      })

      const options = {
        genome: 'hg38',
        locus,
        tracks,
      }

      if (isCorrectParams) igv.createBrowser(ref.current, options)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div ref={ref} />
  },
)

export default withErrorBoundary(IgvPage, {
  fallback: <ErrorPage />,
})
