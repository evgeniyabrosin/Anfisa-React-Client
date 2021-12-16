export const createChunks = (items: any[], size: number): any[] => {
  const chunks = []

  const localItems = JSON.parse(JSON.stringify(items))

  while (localItems.length > 0) {
    chunks.push(localItems.splice(0, size))
  }

  return chunks
}
