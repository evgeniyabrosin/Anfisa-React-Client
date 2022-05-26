import { toast } from 'react-toastify'
import { makeAutoObservable, runInAction } from 'mobx'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { getApiUrl } from '@core/get-api-url'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import mainTableStore from '@store/ws/main-table.store'
import zoneStore from '@store/ws/zone'
import { Routes } from '@router/routes.enum'
import {
  ICsvExportArguments,
  IDs2WsArguments,
} from '@service-providers/operations/operations.interface'
import operationsProvider from '@service-providers/operations/operations.provider'
class OperationsStore {
  savingStatus: [boolean, string] = [false, '']
  isCreationOver = true
  isExportingReport = false

  constructor() {
    makeAutoObservable(this)
  }

  /* TODO: not used anywhere
    async macroTaggingAsync({ tag, off }: { tag: string; off?: boolean }) {
      await wsDatasetProvider.updateMicroTagging({
        ds: datasetStore.datasetName,
        tag,
        conditions: filterStore.conditions,
        filter: filterPresetsStore.activePreset,
        off,
      })

      datasetStore.initDatasetAsync(datasetStore.datasetName)
      dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)
    }
  */
  async exportReportAsync(exportType?: ExportTypeEnum) {
    const { conditions } = filterStore

    const params: ICsvExportArguments = {
      ds: datasetStore.datasetName,
    }

    if (conditions) {
      params.conditions = conditions
    }

    if (zoneStore.zone.length > 0) {
      params.zone = zoneStore.zone
    }

    try {
      this.isExportingReport = true

      if (exportType === ExportTypeEnum.Excel) {
        const response = await operationsProvider.export(params)
        const responseFile = await fetch(getApiUrl(response.fname))

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
        params.schema = 'xbr'

        const response = await operationsProvider.exportCsv(params)

        const url = window.URL.createObjectURL(response)
        const a = document.createElement('a')

        a.href = url
        a.download = `${datasetStore.datasetName}.csv`
        a.click()

        return
      }
    } catch (error) {
      toast.error(String(error))
    } finally {
      this.isExportingReport = false
    }
  }

  async saveDatasetAsync(
    wsName: string,
    pathName: string,
  ): Promise<{ ok: boolean; message?: string }> {
    this.resetIsCreationOver()

    const params: IDs2WsArguments = {
      ds: datasetStore.datasetName,
      ws: wsName,
    }

    const isRefiner = pathName === Routes.Refiner
    const isMainTable = pathName === Routes.WS

    let compareValue: number

    if (isRefiner || isMainTable) {
      compareValue =
        (isRefiner
          ? filterStore.stat.filteredCounts?.variants
          : mainTableStore.fixedStatAmount.variantCounts) ?? 0
      params.conditions = filterStore.conditions
    } else {
      compareValue = dtreeStore.acceptedVariants
      params.code = dtreeStore.dtreeCode
    }

    if (!(compareValue > 0 && compareValue < 9000)) {
      this.setIsCreationOver()

      return {
        ok: false,
        message: 'Too many variants',
      }
    }

    const response = await operationsProvider.createWorkspace(params)

    const jobStatusResponse = await this.getJobStatusAsync(response.task_id)

    if (!jobStatusResponse.ok) {
      return { ok: false, message: jobStatusResponse?.message }
    }

    this.setIsCreationOver()

    return { ok: true }
  }

  async getJobStatusAsync(taskId: string): Promise<any> {
    const response = await fetch(getApiUrl(`job_status?task=${taskId}`))

    const result = await response.json()

    if (result[0] === null) {
      this.setIsCreationOver()

      return { ok: false, message: result[1] }
    }

    runInAction(() => {
      this.savingStatus = result

      if (this.savingStatus[1] === 'Done') this.setIsCreationOver()
    })

    return !result[0]
      ? setTimeout(async () => await this.getJobStatusAsync(taskId), 1000)
      : { ok: true, data: result }
  }

  setIsCreationOver() {
    this.isCreationOver = true
  }

  resetIsCreationOver() {
    this.isCreationOver = false
  }

  resetSavingStatus() {
    this.savingStatus = [false, '']
  }
}

export default new OperationsStore()
