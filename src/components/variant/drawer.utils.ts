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
