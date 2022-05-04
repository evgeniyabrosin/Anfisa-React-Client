import { Fragment, ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'

const imgRegExp = /(.png)|(.jpg)$/m

interface Props {
  id: string
}

export const IframeInfo = observer(({ id }: Props): ReactElement => {
  const [isImg, setIsImg] = useState(true)

  useEffect(() => {
    if (Array.isArray(dirinfoStore.infoFrameLink)) {
      setIsImg(true)

      return
    }

    setIsImg(imgRegExp.test(dirinfoStore.infoFrameLink))
  }, [])

  return (
    <div
      id={id}
      className={cn(
        { flex: !isImg },
        dirinfoStore.iframeInfoFullscreen
          ? 'overflow-auto bg-white'
          : 'flex-grow',
      )}
    >
      {Array.isArray(dirinfoStore.infoFrameLink) && (
        <div>
          {dirinfoStore.infoFrameLink.map(link => {
            return <img key={link} src={link} className={cn('p-3 m-auto')} />
          })}
        </div>
      )}

      {!Array.isArray(dirinfoStore.infoFrameLink) && (
        <Fragment>
          {isImg ? (
            <img
              src={dirinfoStore.infoFrameLink}
              className={cn('p-3 m-auto')}
            />
          ) : (
            <iframe
              src={dirinfoStore.infoFrameLink}
              frameBorder="0"
              className="flex-grow"
            />
          )}
        </Fragment>
      )}
    </div>
  )
})
