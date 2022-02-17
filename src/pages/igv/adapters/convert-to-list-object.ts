import { IListBucket } from '../types/list-bucket.interface'

export const convertToListObject = (
  listBucket: IListBucket,
  folderName: string,
): string[] => {
  const contents = listBucket.ListBucketResult.Contents

  const listObject: string[] = []

  contents.forEach(element => {
    const name: string = element.Key._text

    if (name.startsWith(folderName)) listObject.push(name)
  })

  return listObject
}
