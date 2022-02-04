interface IBucketText {
  _text: string
}

interface IOwner {
  ID: IBucketText
  DisplayName: IBucketText
}

interface IStorageClass {
  _text: string
}

interface IBucketElement {
  Key: IBucketText
  LastModified: IBucketText
  ETag: IBucketText
  Size: IBucketText
  Owner: IOwner
  StorageClass: IStorageClass
}

interface IListBucketResult {
  Contents: IBucketElement[]
}

export interface IListBucket {
  ListBucketResult: IListBucketResult
}
