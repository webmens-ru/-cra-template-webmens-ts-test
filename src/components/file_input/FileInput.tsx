import React, { useRef, useState } from "react";
import { Button } from "../button";
import { Icon } from "../icon";
import useNotification from "../notification";
import { FileInputContainer, FileItem, FileLink, FileRemove, FileSize } from "./styles";
import { FileInputItem, IFileInputProps } from "./types";
import { deleteFileQuery, fileInstanceToFileItem, getFileSize, prepareFileItems, uploadFileQuery, validateFile } from "./utils";

export const FileInput = ({
  defaultFileList,
  uploadUrl,
  deleteUrl,
  maxLimit = 1,
  extensions = [],
  onChange = () => { },
  queryParams = {},
  deleteQueryParams = {}
}: IFileInputProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [notificationContext, notificationAPI] = useNotification()
  
  const [files, setFiles] = useState<FileInputItem[]>(prepareFileItems(defaultFileList))

  const canUploadMore = maxLimit > files.length
  const uploadButtonText =
    (maxLimit === 1 && files.length < 1) ||
    (maxLimit > 1 && files.length < maxLimit) ||
    (maxLimit > 1 && files.length >= 1)
    ? "Добавить файл" : "Заменить файл"

  const addFile = (file: File | FileInputItem, url?: string) => {
    file = file instanceof File ? fileInstanceToFileItem(file, url) : file

    let newFiles: FileInputItem[] = files

    if (canUploadMore && maxLimit === 1) {
      newFiles = [file]
    } else if (canUploadMore && maxLimit > 1) {
      newFiles = [...files, file]
    }

    setFiles(newFiles)
    onChange(newFiles)
  }

  const removeFile = (file: FileInputItem) => {
    const newFiles = files.filter(item => item.key !== file.key)

    setFiles(newFiles)
    onChange(newFiles)
  }

  const handleStartUpload = () => {
    if (fileInput.current) {
      fileInput.current.focus()
      fileInput.current.click()
    }
  }

  const handleFileUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.from(evt.target.files as FileList)
    if (!uploadFiles.length) return

    const file = uploadFiles[0]
    const validationResult = validateFile(file, files, maxLimit, extensions)

    if (validationResult === true) {
      if (uploadUrl) {
        const response = await uploadFileQuery(file, uploadUrl, queryParams)

        if (response.ok) {
          const data = await response.json()
          addFile(file, data.fileLink)
        } else {
          console.error(response);
        }
      } else {
        addFile(file)
      }
    } else {
      notificationAPI.show({ type: "error", content: validationResult.message })
    }
  }

  const handleDeleteFile = async (file: FileInputItem) => {
    if (deleteUrl) {
      const response = await deleteFileQuery(deleteUrl, deleteQueryParams)

      if (response.ok) {
        removeFile(file)
      }
    } else {
      removeFile(file)
    }
  }

  return (
    <FileInputContainer>
      {notificationContext}
      <input type="file" ref={fileInput} onChange={handleFileUpload} />
      {files.map((file) => (
        <FileItem key={file.key}>
          <FileLink href={file.url} children={file.name || file.instance?.name} target="_blank" />
          <FileSize children={getFileSize(file)} />
          <FileRemove onClick={() => handleDeleteFile(file)}>
            <Icon iconWidth="16px" iconName="close" />
          </FileRemove>
        </FileItem>
      ))}
      <Button color="gray" children={uploadButtonText} onClick={handleStartUpload} />
    </FileInputContainer>
  )
}
