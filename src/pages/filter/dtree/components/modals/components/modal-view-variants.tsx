import React, { Key, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import variantStore from '@store/ws/variant'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import { VariantAspectsLayoutGallery } from '@components/variant-aspects-layout'
import { GlbPagesNames } from '@glb/glb-names'
import { TCondition } from '@service-providers/common/common.interface'
import { fetchDsListAsync } from '@utils/TableModal/fetchDsListAsync'
import { fetchJobStatusAsync } from '@utils/TableModal/fetchJobStatusAsync'
import { ReturnedVariantsDataCy } from '../../../../../../components/data-testid/returned-variants'

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

export const ModalViewVariants = observer(() => {
  const [variantList, setVariantList] = useState<any>([])
  const [variantIndex, setVariantIndex] = useState(0)
  const [isSampleMode, setIsSampleMode] = useState(false)
  const [variantSize, setVariantSize] = useState<VariantsSize>()

  const [activeAspect, setActiveAspect] = useState('')

  const ref = useRef(null)
  const variantContainerRef = useRef<HTMLDivElement>(null)

  const stepIndex = dtreeStore.tableModalIndexNumber ?? 0

  useEffect(() => {
    dtreeStore.setShouldLoadTableModal(true)

    const initAsync = async () => {
      const { conditions } = filterStore

      const isRefiner = filterStore.method === GlbPagesNames.Refiner

      const requestValue = isRefiner ? conditions : stepIndex

      const result = await fetchDsListAsync(
        requestValue as number | TCondition[],
      )

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

      const orderNumber = isSample ? samples[0]?.no ?? 0 : 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatusData, samples])

  useEffect(() => {
    if (jobStatusData) {
      if (!samples) return

      const orderNumber = isSample
        ? samples[variantIndex]?.no ?? 0
        : records[variantIndex]?.no ?? 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatusData, variantIndex])

  const closeModal = (event: any) => {
    if (event.currentTarget === event.target) {
      dtreeStore.closeModalViewVariants()
    }
  }

  const isLoading = jobStatus.length === 0 || jobStatus[0] === false

  const toggleMode = () => {
    setIsSampleMode(!isSampleMode)
    const newVariantList = !isSampleMode ? samples : records

    setVariantList(newVariantList)
  }

  return (
    <ModalView className="bg-grey-blue rounded-lg" onClick={closeModal}>
      <ModalContent
        className="flex flex-col rounded-lg overflow-y-auto h-full"
        ref={ref}
      >
        {isLoading ? (
          <div className="flex w-full bg-white h-full rounded-lg items-center justify-around">
            {jobStatus[1]}
          </div>
        ) : (
          <>
            <div className="flex w-full overflow-hidden rounded-lg">
              <div className="w-1/4 flex flex-col bg-white rounded-l-lg overflow-auto">
                <div className="flex px-[14px] py-4">
                  <Radio
                    id="full-list"
                    onChange={toggleMode}
                    disabled={variantSize === 'LARGE'}
                    checked={!isSampleMode}
                    className="flex items-center mr-[14px]"
                  >
                    {t('dtree.fullList')}
                  </Radio>

                  <Radio
                    id="sample-25"
                    disabled={variantSize === 'SMALL'}
                    checked={isSampleMode}
                    onChange={toggleMode}
                    className="flex items-center"
                  >
                    {t('dtree.samples25')}
                  </Radio>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-y-[0.5px] border-grey-blue">
                      <th className="px-4 py-3">Gene</th>

                      <th className="px-4 py-3">Variant</th>
                    </tr>
                  </thead>

                  <tbody>
                    {toJS(variantList)?.map(
                      (
                        variant: { lb: string; no: Key | null | undefined },
                        index: number,
                      ) => {
                        const parts = variant.lb
                          .split(/[[\]]/)
                          .filter(Boolean)
                          .map(el => el.trim())
                        const gene = parts[0]
                        const variantB = parts[1]
                        const active = index === variantIndex
                        return (
                          <tr
                            data-testid={ReturnedVariantsDataCy.sampleButton}
                            key={variant.no}
                            className={cn(
                              'border-y-[0.5px] border-grey-blue cursor-pointer',
                              {
                                'bg-blue-bright': active,
                              },
                            )}
                            onClick={() => setVariantIndex(index)}
                          >
                            <th
                              className="text-sm font-normal py-[30px] px-[16px]"
                              dangerouslySetInnerHTML={{ __html: gene }}
                            />

                            <th
                              className="text-xs font-normal py-[30px] px-[16px]"
                              dangerouslySetInnerHTML={{ __html: variantB }}
                            />
                          </tr>
                        )
                      },
                    )}
                  </tbody>
                </table>
              </div>

              <div className="w-3/4 flex flex-col rounded-r-lg">
                <div className="flex px-4 py-2 justify-between w-full bg-blue-dark">
                  <div
                    data-testid={ReturnedVariantsDataCy.returnedVariantsHeader}
                    className="flex justify-center text-16 font-semi-bold text-blue-bright"
                    dangerouslySetInnerHTML={{
                      __html: variantList ? variantList[variantIndex]?.lb : '',
                    }}
                  />

                  <div className="flex justify-center items-center">
                    <Icon
                      name="Close"
                      onClick={dtreeStore.closeModalViewVariants}
                      size={16}
                      className="cursor-pointer text-white"
                    />
                  </div>
                </div>

                <div
                  ref={variantContainerRef}
                  className="flex flex-col bg-blue-lighter w-full h-full overflow-auto"
                >
                  <VariantAspectsLayoutGallery
                    className="flex-1"
                    igvUrl={variantStore.igvUrl}
                    aspects={variantStore.aspects}
                    activeAspect={activeAspect}
                    onChangeActiveAspect={setActiveAspect}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </ModalContent>
    </ModalView>
  )
})
