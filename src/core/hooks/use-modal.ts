import { useReducer, useRef } from 'react'

export type TModalState<T> = Partial<T> & {
  isOpen: boolean
}

type TModalCallbacks<T> = {
  open: T extends void ? () => void : (payload: T) => void
  close: () => void
}

export type UseModalResult<T> = [
  state: TModalState<T>,
  open: TModalCallbacks<T>['open'],
  close: TModalCallbacks<T>['close'],
]

type ModalAction<T> = { type: 'open'; payload: T } | { type: 'close' }

function modalReducer<T>(
  state: TModalState<T>,
  action: ModalAction<T>,
): TModalState<T> {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        isOpen: true,
        ...action.payload,
      }
    case 'close':
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}

export const useModal = <T = void>(
  initialState?: Partial<T>,
): UseModalResult<T> => {
  const callbacks = useRef<TModalCallbacks<T>>()

  const [state, dispatch] = useReducer(
    modalReducer,
    initialState,
    (s?: Partial<T>) =>
      ({
        ...s,
        isOpen: false,
      } as TModalState<T>),
  )

  if (!callbacks.current) {
    callbacks.current = {
      open: (payload: T) => {
        dispatch({
          type: 'open',
          payload,
        })
      },
      close: () => {
        dispatch({
          type: 'close',
        })
      },
    } as TModalCallbacks<T>
  }

  return [state, callbacks.current.open, callbacks.current.close]
}
