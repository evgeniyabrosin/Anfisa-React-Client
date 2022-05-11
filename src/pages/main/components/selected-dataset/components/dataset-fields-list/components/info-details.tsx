import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { Card } from '@ui/card'
import { Icon } from '@ui/icon'
import { IframeInfo } from '@pages/main/components/selected-dataset/components/dataset-fields-list/components/iframe-info'

export const InfoDetails = observer((): ReactElement => {
  const id = 'IframeInfo'

  const openFullScreen = () => {
    const el = document.querySelector(`#${id}`)

    if (!el) return

    el.requestFullscreen()
  }

  const toggleStoreFullScreen = () => {
    const el = document.querySelector(`#${id}`)

    if (!el) return

    const fullscreenEnabled = document.fullscreenElement !== null

    if (fullscreenEnabled) dirinfoStore.setIframeInfoFullscreen(true)
    else dirinfoStore.setIframeInfoFullscreen(false)
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', toggleStoreFullScreen)

    return () =>
      document.addEventListener('fullscreenchange', toggleStoreFullScreen)
  }, [])

  return (
    <Card className="flex flex-col col-span-2 xl:col-span-3">
      <div className="flex justify-end mb-3">
        <Icon
          name="FullScreen"
          className="text-grey-blue cursor-pointer"
          onClick={openFullScreen}
        />
      </div>

      <IframeInfo id="IframeInfo" />
    </Card>
  )
})
