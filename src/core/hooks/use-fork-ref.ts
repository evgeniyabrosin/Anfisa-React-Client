import { MutableRefObject, Ref, useMemo } from 'react'

const setRef = <T>(
  ref:
    | MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null,
) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export const useForkRef = <A, B>(
  refA: Ref<A> | null | undefined,
  refB: Ref<B> | null | undefined,
): Ref<A & B> | null => {
  return useMemo(() => {
    if (!refA && !refB) {
      return null
    }

    return refValue => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}
