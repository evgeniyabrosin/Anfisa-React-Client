import { xml2json } from 'xml-js'

import { getIgvUrl } from '@core/get-api-url'
import { IListBucket } from '../types/list-bucket.interface'

class IgvServiceProvider {
  async getListBucketAsync() {
    try {
      const response = await fetch(getIgvUrl())
      const xml = await response.text()

      const listBucket: IListBucket = JSON.parse(
        xml2json(xml, { compact: true, spaces: 4 }),
      )

      return listBucket
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)

      return { ListBucketResult: { Contents: [] } }
    }
  }
}

export default new IgvServiceProvider()
