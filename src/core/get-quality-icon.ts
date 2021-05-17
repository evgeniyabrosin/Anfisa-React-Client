export const getIcon = (
  sampleMeta: { affected: boolean; sex: number } | undefined,
) => {
  if (!sampleMeta) {
    return ''
  }

  if (sampleMeta.affected) {
    return sampleMeta.sex === 1 ? 'fill-rect' : 'outline-rect'
  }

  return sampleMeta.sex === 1 ? 'fill-circle' : 'outline-circle'
}
