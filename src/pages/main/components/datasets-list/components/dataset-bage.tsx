import { FC } from 'react'
import cn from 'classnames'

interface IXLBageProps {
  isActive: boolean
}

export const XLBage: FC<IXLBageProps> = ({ isActive }) => (
  <div
    className={cn(
      'flex text-[10px] leading-[10px] h-full font-medium text-white rounded-[2px] ml-2.5 px-[4.5px] py-[3.5px] items-center',
      {
        'text-sm bg-blue-active': isActive,
        'bg-blue-bright': !isActive,
      },
    )}
  >
    XL
  </div>
)
