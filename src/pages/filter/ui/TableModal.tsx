import { Fragment, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import variantStore from '@store/variant'
import { RadioButton } from '@ui/radio-button'
import { VariantBody } from '@components/variant/ui/body'
import { GlbPagesNames } from '@glb/glb-names'
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
  const [layout, setLayout] = useState(variantStore.modalDrawerVariantsLayout)
  const [variantList, setVariantList] = useState<any>([])
  const [variantIndex, setVariantIndex] = useState(0)
  const [isSampleMode, setIsSampleMode] = useState(false)
  const [variantSize, setVariantSize] = useState<VariantsSize>()
  const ref = useRef(null)

  useEffect(() => {
    variantStore.fetchVarinatInfoForModalAsync(datasetStore.datasetName, 0)
  }, [])

  const stepIndex = dtreeStore.tableModalIndexNumber ?? 0

  useEffect(() => {
    dtreeStore.setShouldLoadTableModal(true)

    const initAsync = async () => {
      const isRefiner = filterStore.method === GlbPagesNames.Refiner

      const conditions = datasetStore.conditions

      const requestValue = isRefiner ? conditions : stepIndex

      const result = await fetchDsListAsync(requestValue)

      fetchJobStatusAsync(result.task_id)
    }

    initAsync()

    return () => {
      dtreeStore.clearJobStatus()
      dtreeStore.setShouldLoadTableModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jobStatus = dtreeStore.savingStatus
  const jobStatusData = jobStatus?.[0] ? jobStatus[0] : null
  const records = jobStatusData?.records
  const samples = jobStatusData?.samples
  const datasetName = datasetStore.datasetName
  const isSample = Boolean(samples)

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

      setIsSampleMode(isSample)

      setVariantList(samples || records)

      const orderNumber = isSample ? samples[0]?.no ?? 0 : records[0]?.no ?? 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatusData])

  useEffect(() => {
    if (jobStatusData) {
      const orderNumber = isSample
        ? samples[variantIndex]?.no ?? 0
        : records[variantIndex]?.no ?? 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatusData, variantIndex])

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

  const allVaraints = stepIndex ? dtreeStore.pointCounts[stepIndex] : ''

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
            <div
              className="flex w-full justify-center text-16 font-semibold"
              // data-testid={ReturnedVariantsDataCy.returnedVariantsHeader}
              dangerouslySetInnerHTML={{
                __html: variantList[variantIndex]?.lb ?? '',
              }}
            />

            <div className="flex">
              <div className="p-5">
                <div className="flex flex-col">
                  <div>In scope: {allVaraints}</div>
                  <div className="flex items-center mr-3">
                    <RadioButton
                      isDisabled={variantSize === 'LARGE'}
                      isChecked={!isSampleMode}
                      onChange={toggleMode}
                    />

                    <div className="ml-1">{t('dtree.fullList')}</div>
                  </div>

                  <div className="flex items-center">
                    <RadioButton
                      isDisabled={variantSize === 'SMALL'}
                      isChecked={isSampleMode}
                      onChange={toggleMode}
                    />

                    <p className="ml-1 ">{t('dtree.samples25')}</p>
                  </div>
                </div>

                {variantList.map((_element: any, index: number) => (
                  <div
                    key={index}
                    className="shadow-dark p-1 mb-5 cursor-pointer"
                    // data-testid={ReturnedVariantsDataCy.sampleButton}
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
