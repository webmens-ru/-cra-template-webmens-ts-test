import { BodyPortal } from "@webmens-ru/ui_lib";
import React, { useEffect, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IframePostForm, SliderCloseBlock, SliderContainer, SliderContent, SliderIframeContainer } from "./styles";
import { createIframeFields } from "./utils";

export type SliderContentType = "content" | "iframe"

export interface SliderProps {
  show?: boolean
  width?: string
  title?: string
  timeout?: number
  type?: SliderContentType
  placementOptions?: any
  typeParams?: {
    iframeUrl?: string
    content?: React.ReactNode
  }
  onClose?: () => void
}

const ROOT_ID = "wm-slider-root"
export const DEFAULT_ZINDEX = 2000

export function Slider({ type = "iframe", show, width = "600px", title, timeout = 300, typeParams, placementOptions, onClose }: SliderProps) {
  const cssRef = useRef(null)
  const formIframeRef = useRef<HTMLFormElement>(null)

  const zIndex = useMemo((): number => {
    const root = document.querySelectorAll("#wm-slider-root")
    let zIndex = DEFAULT_ZINDEX
    
    if (!show || !root.length) return zIndex
    
    zIndex += root.length * 10 - 10
    console.log(root.length, zIndex)

    return zIndex
  }, [show])

  useEffect(() => {
    if (type === "iframe" && typeParams?.iframeUrl && formIframeRef.current) {

      for (let [name, value] of Object.entries(placementOptions)) {
        console.log(name, value)
        createIframeFields(name, value as any, formIframeRef.current)
      }
      
      formIframeRef.current.submit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementOptions, type, typeParams?.iframeUrl])

  return (
    <BodyPortal container={ROOT_ID} >
      <CSSTransition
        in={show}
        timeout={timeout}
        nodeRef={cssRef}
      >
        <SliderContainer ref={cssRef} width={width} timeout={timeout} zIndex={zIndex}>
          <div className="backdrop" onClick={onClose} />
          <div className="content-wrapper">
            <SliderCloseBlock timeout={timeout} children={title} onClick={onClose} />
            {show && (
              <SliderContent type={type}>
                {(type === "iframe" && typeParams?.iframeUrl) && (
                  <IframePostForm
                    ref={formIframeRef}
                    action={typeParams.iframeUrl}
                    method="post"
                    target="wm-slider-iframe"
                  >
                    <SliderIframeContainer name="wm-slider-iframe" />
                  </IframePostForm>
                )}
                {(type === "content" && typeParams?.content) && (
                  <>{ typeParams.content }</>
                )}
              </SliderContent>
            )}
          </div>
        </SliderContainer>
      </CSSTransition>
    </BodyPortal>
  )
}
