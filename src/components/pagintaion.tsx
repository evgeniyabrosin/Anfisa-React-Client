import { Dispatch, SetStateAction } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { theme } from '@theme'
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

const Panel = styled.div`
  border: 1px solid ${theme('colors.blue.light')};
  border-radius: 4px;
  display: flex;
  align-items: center;
`

const Separator = styled.div`
  background: ${theme('colors.blue.light')};
  height: 12px;
  width: 1px;
`

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
        <Panel>
          <div onClick={() => changePage(Actions.prev)}>
            <Icon
              name="Arrow"
              size={22}
              className={cn(
                `${
                  !isFirstPage
                    ? 'text-blue-bright cursor-pointer'
                    : 'text-grey-blue'
                }`,
              )}
            />
          </div>

          <Separator />
          <span className="px-2">{testPage + '/' + pagesNumbers}</span>
          <Separator />

          <div onClick={() => changePage(Actions.next)}>
            <Icon
              name="Arrow"
              size={22}
              className={cn(
                'transform -rotate-180',
                `${
                  !isLastPage
                    ? 'text-blue-bright cursor-pointer'
                    : 'text-grey-blue'
                }`,
              )}
            />
          </div>
        </Panel>
      </div>
    )
  },
)
