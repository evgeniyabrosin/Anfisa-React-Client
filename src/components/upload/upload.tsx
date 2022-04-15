import React, { useRef, useState } from 'react'

import { Icon } from '@ui/icon'

export interface IUploadProps {
  onUpload?: (files: FileList, fileName: string) => void
  supportedFormats?: string
}

export const Upload = ({ onUpload, supportedFormats }: IUploadProps) => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const splitted = value.split(/(\\)/)
    const fileName = splitted[splitted.length - 1]

    setUploadedFileName(fileName)

    const fileList = inputRef.current?.files

    if (fileList && onUpload) {
      onUpload(fileList, fileName)
    }
  }

  return (
    <>
      <div className="flex items-center">
        <label
          htmlFor="file-input"
          className="flex rounded px-2 py-1 text-sm mr-2 cursor-pointer"
          style={{ border: '1px solid #9FB1C0' }}
        >
          <div className="pr-2 mr-2 border-grey-blue border-r">
            <Icon name="Cloud" className="text-grey-blue" />
          </div>
          Upload file
        </label>
        <span className="text-xs text-grey-blue">{uploadedFileName}</span>
      </div>
      <input
        ref={inputRef}
        accept={supportedFormats}
        className="invisible"
        style={{ width: '0.1px', height: '0.1px' }}
        type="file"
        name="file-input"
        id="file-input"
        onChange={onInputChange}
      />
    </>
  )
}
