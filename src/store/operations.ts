import { makeAutoObservable } from 'mobx'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'
import dirinfoStore from './dirinfo'
import variantStore from './variant'

class OperationsStore {
  constructor() {
    makeAutoObservable(this)
  }

  async createNoteAsync(noteText: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      rec: String(variantStore.index),
      tags: JSON.stringify({
        ...variantStore.tags.reduce((p, c) => ({ ...p, [c]: true }), {}),
        _note: noteText,
      }),
    })

    await fetch(getApiUrl(`ws_tags`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
  }

  async macroTaggingAsync({ tag, off }: { tag: string; off?: boolean }) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      tag,
      conditions: JSON.stringify(datasetStore.conditions),
      filter: datasetStore.activePreset,
    })

    off && body.append('off', String(off))

    const response = await fetch(
      getApiUrl(`macro_tagging?ds=${datasetStore.datasetName}&tag=${tag}`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      },
    )

    await response.json()

    datasetStore.initDatasetAsync(datasetStore.datasetName)
    dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)
  }

  async exportReportAsync(exportType?: ExportTypeEnum) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions: JSON.stringify(datasetStore.conditions),
      filter: datasetStore.activePreset,
    })

    if (exportType === ExportTypeEnum.Excel) {
      const response = await fetch(getApiUrl(`export`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })

      const result = await response.json()
      const responseFile = await fetch(getApiUrl(result.fname))

      await responseFile.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${datasetStore.datasetName}.xlsx`
        a.click()

        return
      })
    }

    if (exportType === ExportTypeEnum.CSV) {
      body.append('schema', 'xbr')

      const response = await fetch(getApiUrl(`csv_export`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })

      await response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${datasetStore.datasetName}.csv`
        a.click()

        return
      })
    }
  }
}

export default new OperationsStore()
