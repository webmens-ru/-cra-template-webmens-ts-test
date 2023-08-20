import { useLayoutEffect, useState } from "react";
import { IframeContainer } from "./styles";

interface MainIframeProps {
  src: string
  queryParams?: { [key: string]: string | number | undefined }
}

export default function MainIframe({ src, queryParams }: MainIframeProps) {
  const [iframeLink, setIframeLink] = useState(src)
  
  useLayoutEffect(() => {
    const link = new URLSearchParams(src)

    if (queryParams) {
      for (let [key, value] of Object.entries(queryParams)) {
        if (!value) continue
        link.set(key, value?.toString())
      }
    }

    setIframeLink(window.decodeURIComponent(link.toString()))
  }, [queryParams, src])

  return (
    <IframeContainer src={iframeLink} />
  )
}
