import { Dispatch, SetStateAction } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { Icon } from '@ui/icon'

enum Actions {
  first = 'first',
  prev = 'prev',
  next = 'next',
  last = 'last',
}
interface IProps {
  pagesNumbers: number
  currentPage: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

export const Pagintaion = observer(
  ({ pagesNumbers, currentPage, setPageNumber }: IProps) => {
    const testPage = currentPage + 1
    const isFirstPage = currentPage === 0
    const isLastPage = testPage === pagesNumbers

    const changePage = (action: Actions) => {
      switch (action) {
        case Actions.first:
          if (isFirstPage) break
          setPageNumber(0)

          break
        case Actions.prev:
          if (isFirstPage) break
          setPageNumber(currentPage - 1)
          break
        case Actions.next:
          if (isLastPage) break
          setPageNumber(currentPage + 1)

          break
        case Actions.last:
          if (isLastPage) break
          setPageNumber(pagesNumbers - 1)

          break

        default:
          break
      }
    }

    return (
      <div className="flex justify-center">
        {/* <div onClick={() => changePage(Actions.first)}>first</div> */}
        <div onClick={() => changePage(Actions.prev)}>
          <Icon
            name="Arrow"
            size={22}
            className={cn(
              `${!isFirstPage && 'text-blue-bright cursor-pointer'}`,
            )}
          />
        </div>
        <span className="px-2">{testPage}</span>
        <div onClick={() => changePage(Actions.next)}>
          <Icon
            name="Arrow"
            size={22}
            className={cn(
              'transform -rotate-180',
              `${!isLastPage && 'text-blue-bright cursor-pointer'}`,
            )}
          />
        </div>
        {/* <div onClick={() => changePage(Actions.last)}>last</div> */}
      </div>
    )
  },
)
