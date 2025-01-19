import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TooltipComponent from './tooltip';
import { TooltipPosition } from './types';

export interface TooltipProps {
  id: string;
  message?: string;
  position?: TooltipPosition;
}

const DATA_TOOLTIP_ID = "data-tooltip-id"

export const Tooltip = ({ id, message: propMessage, position }: TooltipProps) => {
  const [tooltipPortal, setTooltipPortal] = useState<React.ReactPortal | null>(null)

  const renderTooltip = (element: HTMLElement, ev: MouseEvent) => {
    if (tooltipPortal) return

    const message = element.dataset.tooltipMessage || propMessage
    const portal = ReactDOM.createPortal(
      TooltipComponent({ mouseEvt: ev, targetElement: element, message, position }),
      element.parentElement || document.body
    )

    setTooltipPortal(portal)
  }

  useLayoutEffect(() => {
    const hoverElements = document.querySelectorAll<HTMLElement>(`[${DATA_TOOLTIP_ID}="${id}"]`)

    hoverElements.forEach(elem => {
      elem.addEventListener("mouseenter", (evt) => renderTooltip(elem, evt))
      elem.addEventListener("mouseleave", () => setTooltipPortal(null))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!tooltipPortal) return <></>

  return tooltipPortal
}

export default Tooltip;
