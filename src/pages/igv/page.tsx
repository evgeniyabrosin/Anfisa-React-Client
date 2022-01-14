import { ReactElement, useEffect, useRef } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { observer } from 'mobx-react-lite'

import { ErrorPage } from '@pages/error/error'

const igv = require('igv')

const IgvPage = observer(
  (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const options = {
        genome: 'hg38',
        locus: 'chr1:55052518 deletion',
        tracks: [
          {
            name: 'HG003',
            url:
              'https://anfisa-druid.s3.us-south.cloud-object-storage.appdomain.cloud/bams/GRCh38/HG003.sorted.bam',
            indexURL:
              'https://anfisa-druid.s3.us-south.cloud-object-storage.appdomain.cloud/bams/GRCh38/HG003.sorted.bam.bai',
            format: 'bam',
          },
          {
            name: 'HG002',
            url:
              'https://anfisa-druid.s3.us-south.cloud-object-storage.appdomain.cloud/bams/GRCh38/HG002.sorted.bam',
            indexURL:
              'https://anfisa-druid.s3.us-south.cloud-object-storage.appdomain.cloud/bams/GRCh38/HG002.sorted.bam.bai',
            format: 'bam',
          },
        ],
      }

      igv.createBrowser(ref.current, options)
      // igv.createBrowser(ref.current, options).then((browser: any) => {
      // console.log(browser)
      // })
    }, [])

    return <div ref={ref} />
  },
)

export default withErrorBoundary(IgvPage, {
  fallback: <ErrorPage />,
})
