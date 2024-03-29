import React, { useEffect, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { randomizeString } from "../../app/utils/randomizer";
import { BodyPortal } from "./components/BodyPortal";
import { IframePostForm, SliderCloseBlock, SliderContainer, SliderContent, SliderIframeContainer } from "./styles";
import { createIframeFields } from "./utils";

export type SliderContentType = "content" | "iframe"

export interface SliderProps {
  show?: boolean
  width?: string | number
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
const IFRAME_ROOT_ID = randomizeString("wm-slider-iframe")
export const DEFAULT_ZINDEX = 2000

export function Slider({ type = "iframe", show, width = "95%", title, timeout = 300, typeParams, placementOptions, onClose }: SliderProps) {
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

  const formatWidth = (width: string | number): string => typeof width === 'number' ? width + 'px' : width;

  useEffect(() => {
    if (type === "iframe" && typeParams?.iframeUrl && formIframeRef.current && show) {

      for (let [name, value] of Object.entries(placementOptions)) {
        createIframeFields(name, value as any, formIframeRef.current)
      }
      
      formIframeRef.current.submit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementOptions, type, typeParams?.iframeUrl, show])

  return (
    <BodyPortal className={ROOT_ID} container={ROOT_ID} >
      <CSSTransition
        in={show}
        timeout={timeout}
        nodeRef={cssRef}
      >
        <SliderContainer ref={cssRef} width={formatWidth(width)} timeout={timeout} zIndex={zIndex}>
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
                    target={IFRAME_ROOT_ID}
                  >
                    <SliderIframeContainer name={IFRAME_ROOT_ID} />
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
