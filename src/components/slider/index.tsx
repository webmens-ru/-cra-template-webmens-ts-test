import { BodyPortal } from "@webmens-ru/ui_lib";
import React, { useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import App from "../../App";
import { SliderCloseBlock, SliderContainer, SliderContent, SliderIframeContainer } from "./styles";

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

  const zIndex = useMemo((): number => {
    const root = document.querySelectorAll("#wm-slider-root")
    let zIndex = DEFAULT_ZINDEX
    
    if (!show || !root.length) return zIndex
    
    zIndex += root.length * 10 - 10
    console.log(root.length, zIndex)

    return zIndex
  }, [show])

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
                {type === "iframe" && (
                  <SliderIframeContainer src={typeParams?.iframeUrl} />
                )}
                {(type === "content") && (
                  <App placementOptions={placementOptions} />
                )}
              </SliderContent>
            )}
          </div>
        </SliderContainer>
      </CSSTransition>
    </BodyPortal>
  )
}
