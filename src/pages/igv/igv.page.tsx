import { ReactElement, useEffect, useRef, useState } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { observer } from 'mobx-react-lite'

import { getIgvUrl } from '@core/get-api-url'
import { useParams } from '@core/hooks/use-params'
import { ErrorPage } from '@pages/error/error'
import { convertToListObject } from './adapters/convert-to-list-object'
import igvServiceProvider from './serviceProvider/igv-service-provider'
import { FileMissing } from './ui/file-missing'

const igv = require('igv')

const IgvPage = observer((): ReactElement => {
  const [isEachFilesMissing, setIsEachFilesMissing] = useState<boolean>(false)
  const [listObject, setListObject] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  const params = useParams()

  const locus = params.get('locus')
  const names = params.get('names')
  const nameList = names?.split(',') ?? []

  const isCorrectParams = locus && names

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    igvServiceProvider
      .getListBucketAsync()
      .then(listBucket => convertToListObject(listBucket))
      .then(list => setListObject(list))
  }, [])

  useEffect(() => {
    const tracks = nameList
      .map(name => {
        const path = `bams/GRCh38/${name}.sorted.bam`
        const indexPath = `bams/GRCh38/${name}.sorted.bam.bai`

        const isFileDownloaded = listObject.includes(path)
        const isIndexFileDownloaded = listObject.includes(indexPath)

        const isDownloaded = isFileDownloaded && isIndexFileDownloaded

        return isDownloaded
          ? {
              name,
              url: getIgvUrl(path),
              indexURL: getIgvUrl(indexPath),
              format: 'bam',
            }
          : null
      })
      .filter(element => element)

    const isTracksEmpty = tracks.length === 0

    if (listObject.length > 0) setIsEachFilesMissing(isTracksEmpty)

    const options = {
      genome: 'hg38',
      locus,
      tracks,
    }

    const shouldRenderIgv = isCorrectParams && !isTracksEmpty

    if (shouldRenderIgv) igv.createBrowser(ref.current, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listObject])

  return isEachFilesMissing ? <FileMissing /> : <div ref={ref} />
})

export default withErrorBoundary(IgvPage, {
  fallback: <ErrorPage />,
})
