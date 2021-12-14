import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

type Props = {
  className?: Argument
  style?: any
}
export const EmptySelectedGroup = ({
  className,
  style,
}: Props): ReactElement => (
  <div className={cn('w-1/3 bg-grey-lighter', className)}>
    <div
      className="flex items-center justify-center"
      style={style || { height: 'calc(100vh - 100px)' }}
    >
      <p className="leading-16px text-grey-blue align-center">
        Select a filter
      </p>
    </div>
  </div>
)
