import { ReactElement, useEffect, useRef, useState } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { ErrorPage } from '@pages/error/error'
import NotFoundPage from '@pages/not-found/not-found.page'
import { FileMissing } from './ui/file-missing'

export const hg38Folder = 'GRCh38'

const igv = require('igv')

const IgvPage = observer((): ReactElement => {
  const [isEachFilesMissing, setIsEachFilesMissing] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const params = useParams()

  const stringifiedIgvUrls = params.get('igvUrls')

  const locus = params.get('locus')
  const names = params.get('names')
  const nameList = names?.split(',') ?? []

  const isCorrectParams = locus && names && stringifiedIgvUrls

  if (!isCorrectParams) {
    return <NotFoundPage />
  }

  useEffect(() => {
    const igvUrls: string[] = JSON.parse(stringifiedIgvUrls)

    const tracks = nameList
      .map(name => {
        const path = igvUrls.find(url => url.includes(name))

        if (!path) return null

        const indexPath = `${path}.bai`

        return {
          name,
          url: path,
          indexURL: indexPath,
          format: 'bam',
        }
      })
      .filter(element => element)

    const isTracksEmpty = tracks.length === 0

    if (isTracksEmpty) {
      setIsEachFilesMissing(true)
    } else {
      const options = {
        genome: 'hg38',
        locus,
        tracks,
      }

      igv.createBrowser(ref.current, options)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isEachFilesMissing ? <FileMissing /> : <div ref={ref} />
})

export default withErrorBoundary(IgvPage, {
  fallback: <ErrorPage />,
})
