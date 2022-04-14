import { useState } from 'react'

export enum DrawerClass {
  normClass = 'norm',
  normHitClass = 'norm hit',
  noTrHitClass = 'no-tr-hit',
}

export const getLeftDistance = (
  element: HTMLDivElement | null,
): number | undefined => {
  const tableNode = element?.children?.[0]?.children?.[0]
  const tbodyNode = tableNode?.children[tableNode?.children.length - 1]
  const trackedTdNode = tbodyNode?.children?.[0]?.children?.[1]

  return trackedTdNode?.getBoundingClientRect().left
}

export const useScrollShadow = (
  element: HTMLDivElement | null,
): {
  shouldAddShadow: boolean
  handleScroll: () => void
  handleStartScroll: () => void
} => {
  const [startedLeftDistance, setStartedLeftDistance] = useState<number | null>(
    null,
  )

  const [shouldAddShadow, setShouldAddShadow] = useState(false)

  const handleStartScroll = () => {
    const currentLeftDistance = getLeftDistance(element)

    if (!currentLeftDistance || startedLeftDistance) return

    const fixedLeftDistance = Math.round(currentLeftDistance)
    setStartedLeftDistance(fixedLeftDistance)
  }

  const handleScroll = () => {
    const currentLeftDistance = getLeftDistance(element)

    if (!currentLeftDistance) return

    const fixedCurrentLeftDistance = Math.round(currentLeftDistance)
    const isStartPosition = fixedCurrentLeftDistance === startedLeftDistance

    setShouldAddShadow(!isStartPosition)
  }

  return { shouldAddShadow, handleScroll, handleStartScroll }
}
