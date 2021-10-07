import { Fragment, useEffect, useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import variantStore from '@store/variant'
import { defaultLayout } from '@components/variant/drawer'
import { VariantBody } from '@components/variant/ui/body'
import { fetchDsListAsync } from '@utils/TableModal/fetchDsListAsync'
import { fetchJobStatusAsync } from '@utils/TableModal/fetchJobStatusAsync'

const ModalView = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.div`
  width: 90%;
  min-height: 700px;
  max-height: 500px;
`

type VariantsSize = 'SMALL' | 'MIDDLE' | 'LARGE'

export const TableModal = observer(() => {
  const [layout, setLayout] = useState(defaultLayout)
  const [variantList, setVariantList] = useState<any>([])
  const [variantIndex, setVariantIndex] = useState(0)
  const [isSampleMode, setIsSampleMode] = useState(false)
  const [variantSize, setVariantSize] = useState<VariantsSize>()
  const ref = useRef(null)

  useEffect(() => {
    const initAsync = async () => {
      const index = dtreeStore.tableModalIndexNumber

      if (typeof index !== 'number') return

      const result = await fetchDsListAsync(index)

      fetchJobStatusAsync(result.task_id)
    }

    initAsync()

    // TODO: clear store when component will unmount
  }, [])

  const jobStatus = dtreeStore.savingStatus
  const jobStatusData = jobStatus?.[0] ? jobStatus[0] : null
  const records = jobStatusData?.records
  const samples = jobStatusData?.samples

  useEffect(() => {
    if (jobStatusData) {
      if (
        Boolean(jobStatusData['samples']) &&
        Boolean(jobStatusData['records'])
      ) {
        setVariantSize('MIDDLE')
      } else if (jobStatusData['records']) {
        setVariantSize('SMALL')
      } else {
        setVariantSize('LARGE')
      }

      const isSample = Boolean(samples)

      setIsSampleMode(isSample)

      setVariantList(samples || records)

      const datasetName = datasetStore.datasetName

      const orderNumber = isSample
        ? samples[variantIndex]?.no ?? 0
        : records[variantIndex]?.no ?? 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }
  }, [jobStatusData, records, samples, variantIndex])

  const drawerWidth = window.innerWidth - 380

  const closeModal = (event: any) => {
    if (event.currentTarget === event.target) {
      dtreeStore.closeTableModal()
    }
  }

  const isLoading = jobStatus.length === 0 || jobStatus[0] === false

  const toggleMode = () => {
    setIsSampleMode(!isSampleMode)
    const newVariantList = !isSampleMode ? samples : records

    setVariantList(newVariantList)
  }

  return (
    <ModalView className="bg-grey-blue" onClick={closeModal}>
      <ModalContent
        className="flex flex-col py-4 px-4 bg-white rounded-lg overflow-y-auto"
        ref={ref}
      >
        {isLoading ? (
          jobStatus[1]
        ) : (
          <Fragment>
            <h1 className="text-center">
              {variantList[variantIndex]?.lb ?? ''}
            </h1>
            <div className="flex">
              <div className="p-5">
                <div className="flex">
                  {/* TODO: change Checkbox to radio btn */}
                  <label className="pl-4">
                    <Checkbox
                      disabled={variantSize === 'LARGE'}
                      checked={!isSampleMode}
                      className="mr-1"
                      onChange={toggleMode}
                    />
                    {t('dtree.fullList')}
                  </label>
                  <label className="pl-4">
                    <Checkbox
                      disabled={variantSize === 'SMALL'}
                      checked={isSampleMode}
                      className="mr-1"
                      onChange={toggleMode}
                    />
                    {t('dtree.samples25')}
                  </label>
                </div>

                {variantList.map((_element: any, index: number) => (
                  <div
                    key={index}
                    className="shadow-dark p-1 mb-5 cursor-pointer"
                  >
                    <p onClick={() => setVariantIndex(index)}>
                      N - {index + 1}
                    </p>
                  </div>
                ))}
              </div>
              <VariantBody
                drawerWidth={drawerWidth}
                setLayout={setLayout}
                layout={layout}
              />
            </div>
          </Fragment>
        )}
      </ModalContent>
    </ModalView>
  )
})
