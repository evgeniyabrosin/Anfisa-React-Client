import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

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
  /* height: auto; */
  min-height: 700px;
  max-height: 500px;
`

export const TableModal = observer(() => {
  const [layout, setLayout] = useState(defaultLayout)
  const [variantList, setVariantList] = useState<any>([])
  const [variantIndex, setVariantIndex] = useState(0)
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

  useEffect(() => {
    if (jobStatusData) {
      const { records } = jobStatusData
      const orderNumber = records[variantIndex]?.no ?? 0

      setVariantList(records)

      const datasetName = datasetStore.datasetName

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }
  }, [jobStatusData, variantIndex])

  const drawerWidth = window.innerWidth - 380

  const closeModal = (event: any) => {
    if (event.currentTarget === event.target) {
      dtreeStore.closeTableModal()
    }
  }

  return (
    <ModalView className="bg-grey-blue" onClick={closeModal}>
      <ModalContent
        className="flex flex-col py-4 px-4 bg-white rounded-lg overflow-y-auto"
        ref={ref}
      >
        {jobStatus[0] === false && jobStatus[1]}
        <h1 className="text-center">{variantList[variantIndex]?.lb ?? ''}</h1>
        <div className="flex">
          <div className="p-5">
            {variantList.map((_element: any, index: number) => (
              <div key={index} className="shadow-dark p-1 mb-5 cursor-pointer">
                <p onClick={() => setVariantIndex(index)}>N - {index + 1}</p>
              </div>
            ))}
          </div>
          <VariantBody
            drawerWidth={drawerWidth}
            setLayout={setLayout}
            layout={layout}
          />
        </div>
      </ModalContent>
    </ModalView>
  )
})
