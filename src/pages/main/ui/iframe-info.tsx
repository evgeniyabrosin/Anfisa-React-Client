import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'

const imgRegExp = /(.png)|(.jpg)$/m

export const IframeInfo = observer(
  (): ReactElement => {
    const [isImg, setIsImg] = useState(true)

    useEffect(() => {
      setIsImg(imgRegExp.test(dirinfoStore.infoFrameLink))
    }, [])

    return (
      <div className={cn('flex-grow flex', { 'h-auto': isImg })}>
        {isImg ? (
          <img
            src={dirinfoStore.infoFrameLink}
            className={cn('p-3 h-auto w-full')}
          />
        ) : (
          <iframe
            src={dirinfoStore.infoFrameLink}
            frameBorder="0"
            className="flex-grow"
          />
        )}
      </div>
    )
  },
)
